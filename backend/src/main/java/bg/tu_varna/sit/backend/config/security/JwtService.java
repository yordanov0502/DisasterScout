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

import static bg.tu_varna.sit.backend.models.enums.user.Role.DISPATCHER;

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
        Date jwtIssuedAt = timeService.addMinutesToDateAndTime(timeService.getCurrentDateAndTimeInBulgaria(),1);
        //! FOR DEBUG PURPOSES THE EXPIRATION OF JWT FOR NOW IS SET TO BE 1 minute after issuedAt
        //* When done with debugging/testing jwtExpiration must be =
                          /*timeService.addHoursToDateAndTime(jwtIssuedAt,getHoursOfJwtValidity(user));*/
        Date jwtExpiration = timeService.addMinutesToDateAndTime(jwtIssuedAt,1);


        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(user.getId())
                .setIssuedAt(jwtIssuedAt) //? JWT issuedAt field is set to be plus 1 minute over the actual data & time of user login, because if it is exactly the same as the login date & time, the business logic for JWT validation might break and fail due to high network traffic or slow internet connection. Generally, it is good for a JWT to be created(issuedAt) shortly after user has logged in, but NEVER BEFORE it for security reasons.
                .setExpiration(jwtExpiration) //! Duration varies according to the user's ROLE
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getSignInKey() {
        byte [] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    //? Returns how long in hours a JWT should be valid based on the role of a user
    // 12H for DISPATCHER
    // 24H for ADMIN
    public int getHoursOfJwtValidity(User user){
        if(user.getRole().equals(DISPATCHER)) return 12;
        else return 24;
    }

    //? Returns how long in seconds a JWT should be valid based on the role of a user
    // 12H for DISPATCHER
    // 24H for ADMIN
    @Deprecated(forRemoval = true)
    public int getSecondsOfJwtValidity(User user){
       return getHoursOfJwtValidity(user) * 60 * 60;
    }
}