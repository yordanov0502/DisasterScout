package bg.tu_varna.sit.backend.config.security;

import bg.tu_varna.sit.backend.models.entity.User;
import bg.tu_varna.sit.backend.service.util.TimeService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import static bg.tu_varna.sit.backend.models.enums.Role.ADMIN;

@Service
@RequiredArgsConstructor
public class JwtService {

    @Value("${spring.security.jwt.secret}")
    private String SECRET_KEY;
    private final TimeService timeService;

    public String extractId(String token) {
        return extractClaim(token,Claims::getSubject);//the subject should be the username of a certain user (or email), but we use ID, in order not to generate a new JWT, when a user update their username or email.
    }

    public Date extractIssuedAt(String token){
        return extractClaim(token,Claims::getIssuedAt);
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
        int hoursOfJwtValidity = 12; //? 12H for dispatcher
        if(user.getRole().equals(ADMIN)) {hoursOfJwtValidity = 24;} //? 24H for admin
        Date currentDateAndTimeInBulgaria = timeService.getCurrentDateAndTimeInBulgaria();

        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(user.getId())
                .setIssuedAt(timeService.addMinutesToCurrentDateAndTime(currentDateAndTimeInBulgaria,1)) //? JWT issuedAt field is set to be plus 1 minute over the actual data & time of user login, because if it is exactly the same as the login date & time, the business logic for JWT validation might break and fail due to high network traffic or slow internet connection. Generally, it is good for a JWT to be created(issuedAt) shortly after user has logged in, but NEVER BEFORE it for security reasons.
                .setExpiration(timeService.addHoursToCurrentDateAndTime(currentDateAndTimeInBulgaria,hoursOfJwtValidity)) //! Duration varies according to the user's ROLE
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getSignInKey() {
        byte [] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

//    @Deprecated(forRemoval = false)
//    public boolean isTokenExpired(String token) {
//        //Date d = new Date();
//        return extractExpiration(token).before(new Date());
//    }

//    @Deprecated(forRemoval = false)
//    private Date extractExpiration(String token) {
//        return extractClaim(token,Claims::getExpiration);
//    }
}