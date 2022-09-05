import 'dart:io';

import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import 'package:firebase/firestore.dart';

class UploadService {
  File? _imageFile;

  Future uploadImageToFirebase(BuildContext context) async {
    String? fileName = _imageFile?.path;
    Reference firebaseStorageRef =
        FirebaseStorage.instance.ref().child('images/$fileName');
    UploadTask uploadTask = firebaseStorageRef.putFile(_imageFile!);
    uploadTask.then(
      (res) => print(res.ref.getDownloadURL()),
    );
  }
}
