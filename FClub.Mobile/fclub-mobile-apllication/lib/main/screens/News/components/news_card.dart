import 'package:UniClub/main/components/rounded_button.dart';
import 'package:flutter/material.dart';
import 'package:UniClub/main/constants.dart';

class NewsCard extends StatelessWidget {
  final String title;
  final String content;
  final String time;
  final String logo;

  const NewsCard(
      {Key? key,
      required this.title,
      required this.content,
      required this.time,
      required this.logo})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return InkWell(
      child: Container(
        width: size.width,
        decoration: BoxDecoration(
            border: Border.all(
              color: kPrimaryColor,
            ),
            color: Colors.white,
            borderRadius: BorderRadius.circular(15.0)),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Container(
                padding: EdgeInsets.fromLTRB(10, 5, 18, 5),
                // width: size.width,
                decoration: BoxDecoration(
                    color: kPrimaryColor.withOpacity(0.7),
                    borderRadius: BorderRadius.only(
                        topRight: Radius.circular(15.0),
                        topLeft: Radius.circular(15.0)),
                    border: Border.all(color: Colors.transparent)),
                alignment: Alignment.bottomLeft,
                child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Container(
                        margin: EdgeInsets.fromLTRB(0, 0, 5, 0),
                        height: 25,
                        width: 25,
                        decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            image: new DecorationImage(
                                image: NetworkImage(logo),
                                fit: BoxFit.fitHeight)),
                      ),
                      Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                Text(title,
                                    textAlign: TextAlign.justify,
                                    overflow: TextOverflow.visible,
                                    maxLines: 2,
                                    style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 14,
                                        fontWeight: FontWeight.bold,
                                        decorationStyle:
                                            TextDecorationStyle.solid))
                              ],
                            ),
                            Text(time,
                                textAlign: TextAlign.justify,
                                overflow: TextOverflow.visible,
                                style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 10,
                                    fontWeight: FontWeight.normal,
                                    fontStyle: FontStyle.italic,
                                    decorationStyle: TextDecorationStyle.solid))
                          ])
                    ])),
            Padding(
              padding: EdgeInsets.all(10.0),
              child: Text(content,
                  textAlign: TextAlign.justify,
                  overflow: TextOverflow.visible,
                  style: TextStyle(
                      color: Colors.black54,
                      fontSize: 15,
                      fontWeight: FontWeight.normal,
                      decorationStyle: TextDecorationStyle.solid)),
            ),
          ],
        ),
      ),
    );
  }
}
