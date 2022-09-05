import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:UniClub/main/Screens/Signin/login_screen.dart';
import 'package:UniClub/main/Screens/Signup/components/background.dart';
import 'package:UniClub/main/Screens/Signup/components/or_divider.dart';
import 'package:UniClub/main/Screens/Signup/components/social_icon.dart';
import 'package:UniClub/main/components/already_have_an_account_acheck.dart';
import 'package:UniClub/main/components/rounded_button.dart';
import 'package:UniClub/main/components/rounded_input_field.dart';
import 'package:UniClub/main/components/rounded_password_field.dart';
import 'package:UniClub/main/constants.dart';
import 'package:google_fonts/google_fonts.dart';

class Body extends StatefulWidget {
  const Body({Key? key}) : super(key: key);

  @override
  _BodyState createState() => _BodyState();
}

class _BodyState extends State<Body> {
  final formKey = GlobalKey<FormState>();
  @override
  void dispose() {
    super.dispose();
  }

  var confirmPass;
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Background(
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Image.asset(
              "assets/images/UniClub-logo.png",
              height: size.height * 0.2,
            ),
            Text(
              "SIGN UP WITH GOOGLE",
              style: GoogleFonts.dmSans(
                  fontWeight: FontWeight.bold,
                  color: kPrimaryColor,
                  fontSize: 20.0,
                  letterSpacing: 5.0),
            ),
            SizedBox(height: size.height * 0.05),
            RoundedInputField(
              nullCheck: "Enter your email",
              hintText: "Your Email",
              onChanged: (value) {
                setState(() {
                  value = FirebaseAuth.instance.currentUser!.email.toString();
                });
              },
            ),
            RoundedInputField(
              nullCheck: "Enter your name",
              hintText: "Your Name",
              onChanged: (value) {},
            ),
            RoundedButton(
              text: "SIGN UP",
              press: () async {
                if (formKey.currentState!.validate()) {}
              },
            ),
            SizedBox(height: size.height * 0.03),
            AlreadyHaveAnAccountCheck(
              login: false,
              press: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return LoginScreen();
                    },
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
