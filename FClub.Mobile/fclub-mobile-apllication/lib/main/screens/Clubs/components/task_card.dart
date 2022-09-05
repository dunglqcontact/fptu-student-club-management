import 'package:UniClub/main/components/rounded_button.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:UniClub/main/constants.dart';
import 'package:flutter/painting.dart';
import 'package:intl/intl.dart';

class TaskCard extends StatelessWidget {
  final VoidCallback press;
  final String title;
  final String content;
  final double award;
  final double penalty;
  final String Begintime;
  final String Duetime;
  final bool status;

  const TaskCard(
      {Key? key,
      required this.press,
      required this.title,
      required this.content,
      required this.award,
      required this.penalty,
      required this.Begintime,
      required this.Duetime,
      required this.status})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return InkWell(
      onTap: press,
      child: Container(
        width: size.width,
        height: 150,
        decoration: BoxDecoration(
          border: Border.all(
            color: kPrimaryColor,
          ),
          color: Colors.white,
          borderRadius: BorderRadius.circular(5.0),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              width: 18,
              decoration: BoxDecoration(color: kSubColor2),
            ),
            Container(
                padding: EdgeInsets.fromLTRB(18, 18, 0, 18),
                child: Expanded(
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                      Text(title,
                          textAlign: TextAlign.right,
                          style: TextStyle(
                            color: kPrimaryColor,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          )),
                      Text(content,
                          softWrap: true,
                          overflow: TextOverflow.ellipsis,
                          textAlign: TextAlign.left,
                          style: TextStyle(
                            fontSize: 13,
                            color: Colors.black87,
                          )),
                      Text.rich(
                        TextSpan(
                            text: "Point : ",
                            style: TextStyle(
                                fontSize: 13,
                                color: kPrimaryColor,
                                fontWeight: FontWeight.bold,
                                decorationStyle: TextDecorationStyle.solid),
                            children: [
                              TextSpan(
                                  text: '+' + award.toString(),
                                  style: TextStyle(
                                      fontSize: 13,
                                      color: Colors.green,
                                      fontWeight: FontWeight.bold),
                                  children: [
                                    TextSpan(
                                        text: "/",
                                        style: TextStyle(
                                            fontSize: 13,
                                            color: Colors.black87),
                                        children: [
                                          TextSpan(
                                              text: '-' + penalty.toString(),
                                              style: TextStyle(
                                                  fontSize: 13,
                                                  color: Colors.red,
                                                  fontWeight: FontWeight.bold))
                                        ])
                                  ]),
                            ]),
                      ),
                      Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text.rich(
                              TextSpan(
                                  text: "Time : " + "",
                                  style: TextStyle(
                                      fontSize: 13,
                                      color: kPrimaryColor,
                                      fontWeight: FontWeight.bold,
                                      decorationStyle:
                                          TextDecorationStyle.solid),
                                  children: [
                                    TextSpan(
                                      text: Begintime + " - " + Duetime,
                                      style: TextStyle(
                                          fontSize: 13, color: Colors.black87),
                                    )
                                  ]),
                            ),
                            Container(
                                height: 50,
                                width: 90,
                                child: RoundedButton(
                                  press: () {},
                                  text: "Accept",
                                  textColor: Colors.white,
                                  color: kPrimaryColor,
                                ))
                          ]),
                    ])))
          ],
        ),
      ),
    );
  }
}
