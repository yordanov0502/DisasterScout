package bg.tu_varna.sit.backend.config.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @Value("${env.STORAGE_BUCKET_NAME}")
    private String storageBucketName;

    @Bean
    public FirebaseApp initializeFirebase() throws IOException {
        FileInputStream serviceAccount =
                new FileInputStream("backend/src/main/resources/serviceAccountKey.json");

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setStorageBucket(storageBucketName)
                .build();

        return FirebaseApp.initializeApp(options);
    }

    @Bean
    public Storage firebaseStorage() throws IOException {
        FileInputStream serviceAccount =
                new FileInputStream("backend/src/main/resources/serviceAccountKey.json");

        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
        return StorageOptions.newBuilder().setCredentials(credentials).build().getService();
    }

}
