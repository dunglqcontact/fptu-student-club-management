import 'package:flutter/material.dart';
import 'package:UniClub/main/Screens/Signin/login_screen.dart';
import 'package:UniClub/main/Screens/Signup/signup_screen.dart';
import 'package:UniClub/main/Screens/Welcome/components/background.dart';
import 'package:UniClub/main/components/rounded_button.dart';
import 'package:UniClub/main/constants.dart';
import 'package:google_fonts/google_fonts.dart';

class Body extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    // This size provide us total height and width of our screen
    return Background(
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              "Welcome to UniClub!",
              style: GoogleFonts.openSans(fontSize: 20, color: kPrimaryColor),
            ),
            Image.asset(
              "assets/images/UniClub.png",
              height: size.height * 0.5,
            ),
            RoundedButton(
              text: "SIGN IN",
              press: () => {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return LoginScreen();
                    },
                  ),
                )
              },
            ),
            RoundedButton(
              text: "SIGN UP",
              color: kSubColor,
              textColor: kPrimaryColor,
              press: () => {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return SignUpScreen();
                    },
                  ),
                )
              },
            ),
          ],
        ),
      ),
    );
  }
}
