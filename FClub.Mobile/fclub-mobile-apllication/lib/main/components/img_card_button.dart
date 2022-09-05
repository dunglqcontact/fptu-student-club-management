import 'package:flutter/material.dart';
import 'package:UniClub/main/constants.dart';

class ImgCardButton extends StatelessWidget {
  final Widget pageRoute;
  final String imageUrl;
  final String buttonText;

  const ImgCardButton({
    Key? key,
    required this.pageRoute,
    required this.imageUrl,
    required this.buttonText,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => Navigator.push(
          context, MaterialPageRoute(builder: (context) => pageRoute)),
      child: Container(
        width: 120.0,
        height: 120.0,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: kSubColor2.withOpacity(0.3),
              spreadRadius: 5,
              blurRadius: 7,
              offset: Offset(0, 3), // changes position of shadow
            ),
          ],
          color: Colors.white,
          borderRadius: BorderRadius.circular(30.0),
        ),
        padding: const EdgeInsets.all(8),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Image.asset(imageUrl, height: 70, width: 70),
            Text(buttonText,
                style: TextStyle(
                  color: kPrimaryColor,
                  fontWeight: FontWeight.bold,
                )),
          ],
        ),
      ),
    );
  }
}
