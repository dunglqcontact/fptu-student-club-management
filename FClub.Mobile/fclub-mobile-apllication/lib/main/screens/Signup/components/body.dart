import 'package:UniClub/main/screens/Authenticate/wrapper.dart';
import 'package:UniClub/main/screens/GoogleSignup/signup_google_screen.dart';
import 'package:UniClub/service/auth.dart';
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
  final AuthService _auth = AuthService();
  final formKey = GlobalKey<FormState>();
  final TextEditingController _pass = TextEditingController();
  final TextEditingController _confirmPass = TextEditingController();

  @override
  void dispose() {
    _pass.dispose();
    _confirmPass.dispose();
    super.dispose();
  }

  String error = "";

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
              "SIGN UP",
              style: GoogleFonts.dmSans(
                  fontWeight: FontWeight.bold,
                  color: kPrimaryColor,
                  fontSize: 20.0,
                  letterSpacing: 5.0),
            ),
            SizedBox(height: size.height * 0.05),
            RoundedInputField(
              nullCheck: "Enter an email",
              hintText: "Your Email",
              onChanged: (value) {},
            ),
            PasswordInput((value) {}, 'Password', TextInputAction.next, _pass),
            PasswordInput(
                (value) {}, 'Confirm Password', TextInputAction.next, _pass),
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
            )
          ],
        ),
      ),
    );
  }
}
