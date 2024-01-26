package bg.tu_varna.sit.backend.config.security;

import bg.tu_varna.sit.backend.models.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

import static bg.tu_varna.sit.backend.models.enums.Role.ADMIN;
import static bg.tu_varna.sit.backend.models.enums.Role.DISPATCHER;

@Service
public class JwtService {

    @Value("${spring.security.jwt.secret}")
    private String SECRET_KEY;

    public String extractId(String token) {
        return extractClaim(token,Claims::getSubject);//the subject should be the username of a certain user (or email), but we use ID, in order not to generate a new JWT, when a user update their username or email.
    }

    private  <T> T extractClaim(String token, Function<Claims,T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String generateToken(User user){
        return generateToken(new HashMap<>(), user);
    }

    private String generateToken(Map<String,Object> extraClaims, User user){
        long hoursInMillis = TimeUnit.HOURS.toMillis(1);//? 1H Default time for ordinary users
        if(user.getRole().equals(DISPATCHER)) {hoursInMillis = TimeUnit.HOURS.toMillis(12);} //? 12H for dispatcher
        else if(user.getRole().equals(ADMIN)) {hoursInMillis = TimeUnit.HOURS.toMillis(24);} //? 24H for admin

        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(user.getId())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + hoursInMillis))//! Duration vary to the user ROLE
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getSignInKey() {
        byte [] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    @Deprecated(forRemoval = true)
    public boolean isTokenValid(String token,User user){
        final String extractedId = extractId(token);
        return (extractedId.equals(user.getId()) /*&& !isTokenExpired(token)*/);
    }

    @Deprecated(forRemoval = false)
    public boolean isTokenExpired(String token) {
        //Date d = new Date();
        return extractExpiration(token).before(new Date());
    }

    @Deprecated(forRemoval = false)
    private Date extractExpiration(String token) {
        return extractClaim(token,Claims::getExpiration);
    }
}