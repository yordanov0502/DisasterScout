package bg.tu_varna.sit.backend.service.util;

import org.apache.commons.lang3.time.DateUtils;
import org.springframework.stereotype.Service;

import java.util.Date;


// The Unix epoch (or Unix time or POSIX time or Unix timestamp) is the number of seconds that have elapsed
// since January 1, 1970 (midnight UTC/GMT), not counting leap seconds (in ISO 8601: 1970-01-01T00:00:00Z).
//* In Java, the Date object is based on the number of milliseconds that have elapsed since January 1, 1970, 00:00:00 UTC (Coordinated Universal Time).
//? The time for Date object is based on the OS clock settings through JVM.
//? Currently, in Bulgaria the current time set to the new Date() object is 2 hours behind the time zone of Bulgaria
//?? This service adds +2 hours to the current time set for new Date() object to match the time zone of Bulgaria
//!!!!!!!!!!However, if this backend application is deployed on a server/cloud in a country different from Bulgaria,
//!!!!!!!!!!the amount of hours added or subtracted to the new Date() should be carefully considered in order to match
//!!!!!!!!!!the time of Bulgaria due to time zone differences between foreign country/ies and Bulgaria
//!!!!!!!!!!For example: if this backend application is deployed on a cloud server hosted in America,
//!!!!!!!!!!the time of a new Date() object will be obtained from the OS clock settings of the cloud server
//!!!!!!!!!!and hours here in this service MUST be added or subtracted, in order to match the time zone of Bulgaria.
@Service
public class TimeService {

    //? current date & time(UTC/GMT+2H) for Bulgaria(EET-Eastern European Time)
    //! Hours MUST be adjusted to match the time zone of Bulgaria
    //!!! When Date is printed as String, it is presented +2 hours(over the +2 hours already added in the method),
    //!!! for example: if the method returns and is saved in DB AS 14:05, as String it will be printed: 16:05
    public Date getCurrentDateAndTimeInBulgaria(){
        return DateUtils.addHours(new Date(),2);
    }

    //? This is a method should ONLY be used for setting a "default" date for the lastLogin attribute
    //? of newly registered dispatchers, which haven't logged in yet.
    // January 1, 1970, at 02:00:00 EET (Eastern European Time)
    public Date getInitialUnixEpochDateAndTimeInEET(){
        return DateUtils.addHours(new Date(0),2);
    }

    //? This method INCREMENT hours to the given date argument and returns a new Date object with the incremented hours
    //* Used only in the JwtService to set when a certain jwt will expire.(up until when jwt it is valid)
    public Date addHoursToCurrentDateAndTime(Date date,int hours){
        return DateUtils.addHours(date,hours);
    }

    //? This method INCREMENT minutes to the given date argument and returns a new Date object with the incremented hours
    //* Used only in the JwtService to set when a certain jwt is created("issuedAt")
    public Date addMinutesToCurrentDateAndTime(Date date,int minutes){
        return DateUtils.addMinutes(date,minutes);
    }

}
