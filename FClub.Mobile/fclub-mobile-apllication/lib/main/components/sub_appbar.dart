import 'package:flutter/material.dart';
import 'package:UniClub/main/constants.dart';
import 'package:google_fonts/google_fonts.dart';

class SubBar extends StatelessWidget with PreferredSizeWidget {
  @override
  Size get preferredSize {
    return new Size.fromHeight(50.0);
  }

  final String title;

  const SubBar(
    this.title, {
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        IconButton(
          onPressed: () => Navigator.pop(context),
          icon: Icon(Icons.arrow_back_ios_new),
          color: kPrimaryColor,
        ),
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
        SizedBox(width: 50.0),
      ],
    );
  }
}
