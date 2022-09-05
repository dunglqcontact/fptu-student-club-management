import 'package:UniClub/main/screens/Home/home.dart';
import 'package:UniClub/model/user.dart';
import 'package:UniClub/network/user_request.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:UniClub/main/screens/Welcome/welcome_screen.dart';
import 'package:UniClub/main/constants.dart' as global;

class Wrapper extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    final user = FirebaseAuth.instance.currentUser;
    UserRequest.fetchUserByEmail(user?.email)
        ?.then((value) => global.user = value);
    print(user);
    if (user == null) {
      return WelcomeScreen();
    } else {
      return Home();
    }
  }
}
