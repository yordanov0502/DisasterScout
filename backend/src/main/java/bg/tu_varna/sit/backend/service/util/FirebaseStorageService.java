package bg.tu_varna.sit.backend.service.util;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FirebaseStorageService {

    private final Storage storage;

    public void deleteFile(String bucketName, String filePath) {
        Bucket bucket = storage.get(bucketName);
        Blob blob = bucket.get(filePath);
        if (blob != null) {
            blob.delete();
        }
    }

    public String extractFilePathFromUrl(String url) {
        int startIndex = url.indexOf("/o/") + 3;
        int endIndex = url.indexOf("?alt=media");
        return url.substring(startIndex, endIndex).replace("%2F", "/");
    }

}