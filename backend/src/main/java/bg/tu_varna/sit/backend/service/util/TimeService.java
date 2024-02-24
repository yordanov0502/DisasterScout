package bg.tu_varna.sit.backend.service.util;

import org.apache.commons.lang3.time.DateUtils;
import org.springframework.stereotype.Service;

import java.util.Date;


// The Unix epoch (or Unix time or POSIX time or Unix timestamp) is the number of seconds that have elapsed
// since January 1, 1970 (midnight UTC/GMT), not counting leap seconds (in ISO 8601: 1970-01-01T00:00:00Z).
//* In Java, the Date object is based on the number of milliseconds that have elapsed since January 1, 1970, 00:00:00 UTC (Coordinated Universal Time).
//? The time for Date object is based on the OS clock settings through JVM.
//? Currently, in Bulgaria the time of Date object is in EET(Eastern European Time), but in MongoDB is in UTC
//!!!!!!!!!!However, if this backend application is deployed on a server/cloud in a country different from Bulgaria,
//!!!!!!!!!!a certain amount of hours MUST be added or subtracted to the new Date() in order to match
//!!!!!!!!!!the time of Bulgaria due to time zone differences between foreign country/ies and Bulgaria
//!!!!!!!!!!For example: if this backend application is deployed on a cloud server hosted in America,
//!!!!!!!!!!the time of a new Date() object will be obtained from the OS clock settings of the cloud server
//!!!!!!!!!!and hours here in this service MUST be added or subtracted, in order to match the time zone of Bulgaria.  DateUtils.addHours(new Date(),hours);
@Service
public class TimeService {

    //! Hours MUST be adjusted to match the time zone of Bulgaria if server is deployed in a foreign country with different timezone
    public Date getCurrentDateAndTimeInBulgaria(){return new Date();}

    //? This method IS AND MUST ONLY be used for setting a "default" date for the lastLogin attribute
    //? of a new registered dispatcher, who hasn't logged in yet.
    public Date getUnixEpochDateAndTime(){return new Date(0);}

    //? This method INCREMENT hours to the given date argument and returns a new Date object with the incremented hours
    //* Used only in the JwtService to set when a certain jwt will expire.(up until when jwt it is valid)
    public Date addHoursToDateAndTime(Date date, int hours){
        return DateUtils.addHours(date,hours);
    }

    //? This method INCREMENT minutes to the given date argument and returns a new Date object with the incremented minutes
    //* Used only in the JwtService to set when a certain jwt is created("issuedAt")
    public Date addMinutesToDateAndTime(Date date, int minutes){
        return DateUtils.addMinutes(date,minutes);
    }

    //! Hours MUST be adjusted to match the time zone of Bulgaria if server is deployed in a foreign country with different timezone
    //? This method return 172 800 seconds(48 hours) + 7 200 seconds(2 hours) which in total is 180 000 seconds
    //? Basically the maxAge of this cookie must be 48 hours, but on the browser time is processed in UTC which
    //? decrease those 48 hours to 46 hours. Because of this I add 2 more hours here (48+2=50) so when
    //? those 50 hours(in seconds) arrive in the frontend as an attribute of the httpOnlyCookie
    //? the browser will again process time in UTC so this 50 hours will become actually 48 which is my main goal
    public long getMaxAgeOfHttpOnlyCookie(){return 180_000;}
}
