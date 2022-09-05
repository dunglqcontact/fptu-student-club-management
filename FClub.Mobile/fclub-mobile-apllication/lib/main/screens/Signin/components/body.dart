import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:UniClub/main/Screens/Signin/components/background.dart';
import 'package:UniClub/main/Screens/Signup/components/or_divider.dart';
import 'package:UniClub/main/Screens/Signup/components/social_icon.dart';
import 'package:UniClub/main/Screens/Signup/signup_screen.dart';
import 'package:UniClub/main/components/already_have_an_account_acheck.dart';
import 'package:UniClub/main/components/rounded_button.dart';
import 'package:UniClub/main/components/rounded_input_field.dart';
import 'package:UniClub/main/components/rounded_password_field.dart';
import 'package:UniClub/main/constants.dart';
import 'package:UniClub/main/screens/Authenticate/wrapper.dart';
import 'package:UniClub/main/screens/GoogleSignup/signup_google_screen.dart';
import 'package:UniClub/service/auth.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:google_sign_in/google_sign_in.dart';

class Body extends StatefulWidget {
  @override
  _BodyState createState() => _BodyState();
}

class _BodyState extends State<Body> {
  final AuthService _auth = AuthService();
  final formKey = GlobalKey<FormState>();
  final _passwordController = TextEditingController();
  final _emailController = TextEditingController();

  @override
  void dispose() {
    _passwordController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  String email = "";
  String password = "";
  String error = "";
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Background(
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            SizedBox(height: size.height * 0.03),
            Image.asset(
              "assets/images/UniClub-logo.png",
              height: size.height * 0.2,
            ),
            Text(
              "SIGN IN",
              style: GoogleFonts.dmSans(
                  fontWeight: FontWeight.bold,
                  color: kPrimaryColor,
                  fontSize: 20.0,
                  letterSpacing: 5.0),
            ),
            SizedBox(height: size.height * 0.03),
            RoundedInputField(
              nullCheck: "Enter an email",
              hintText: "Your Email",
              onChanged: (value) {
                setState(() => email = value);
              },
            ),
            PasswordInput((value) {
              setState(() => password = value);
            }, ' Password', TextInputAction.next, _passwordController),
            RoundedButton(
                text: "SIGN IN",
                press: () async {
                  dynamic result = await _auth.signInWithEmail(email, password);
                  print(result);
                  if (result == null) {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) {
                          return SignUpGoogleScreen();
                        },
                      ),
                    );
                  } else {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) {
                          return Wrapper();
                        },
                      ),
                    );
                  }
                }),
            OrDivider(),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                SocalIcon(
                  iconSrc: "assets/icons/facebook.svg",
                  press: () {},
                ),
                SocalIcon(
                  iconSrc: "assets/icons/twitter.svg",
                  press: () {},
                ),
                SocalIcon(
                  iconSrc: "assets/icons/google-plus.svg",
                  press: () async {
                    dynamic result = await _auth.signInWithGoogle();
                    print(result);
                    if (result == null) {
                      setState(() => error = "EMAIL OR PASSWORD IS INCORRECT");
                    } else {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) {
                            return Wrapper();
                          },
                        ),
                      );
                    }
                  },
                ),
              ],
            ),
            SizedBox(height: size.height * 0.03),
            AlreadyHaveAnAccountCheck(
              press: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return SignUpScreen();
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
