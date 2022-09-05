import 'package:UniClub/main/screens/Welcome/welcome_screen.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:UniClub/main/constants.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:google_sign_in/google_sign_in.dart';

class TitleBar extends StatelessWidget with PreferredSizeWidget {
  @override
  Size get preferredSize {
    return new Size.fromHeight(50.0);
  }

  final String title;

  const TitleBar(
    this.title, {
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    signOut() async {
      await GoogleSignIn().signOut();
      await FirebaseAuth.instance.signOut();
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) {
            return WelcomeScreen();
          },
        ),
      );
    }

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        // IconButton(
        //   onPressed: () => Navigator.pop(context),
        //   icon: Icon(Icons.arrow_back_ios_new),
        //   color: kPrimaryColor,
        // ),
        SizedBox(width: 50.0),
        Container(
            alignment: Alignment.center,
            child:
                Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              Image.asset(
                "assets/images/UniClub-logo.png",
                height: 25.0,
              ),
              Text(
                title,
                style: GoogleFonts.dmSans(
                    fontWeight: FontWeight.bold,
                    color: kPrimaryColor,
                    fontSize: 20.0,
                    letterSpacing: 2.0),
              ),
            ])),
        IconButton(
            onPressed:
                // ignore: unnecessary_statements
                signOut,
            icon: Icon(
              Icons.logout,
              color: kPrimaryColor,
            ))
      ],
    );
  }
}
