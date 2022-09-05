import 'package:UniClub/main/components/rounded_button.dart';
import 'package:flutter/material.dart';
import 'package:UniClub/main/constants.dart';

class EventCard extends StatelessWidget {
  final Widget pageRoute;
  final String image;
  final String Id;
  final String Time;

  const EventCard(
      {Key? key,
      required this.pageRoute,
      required this.image,
      required this.Id,
      required this.Time})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return InkWell(
      onTap: () => Navigator.push(
          context, MaterialPageRoute(builder: (context) => pageRoute)),
      child: Container(
        height: size.height * 0.2,
        decoration: BoxDecoration(
            border: Border.all(color: kPrimaryColor),
            color: Colors.white,
            borderRadius: BorderRadius.circular(15.0),
            image: DecorationImage(
                image: NetworkImage(image), fit: BoxFit.fitWidth)),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            Container(
                padding: EdgeInsets.fromLTRB(8, 5, 8, 5),
                width: size.width,
                decoration: BoxDecoration(
                    color: kPrimaryColor.withOpacity(0.7),
                    borderRadius: BorderRadius.only(
                        bottomRight: Radius.circular(15.0),
                        bottomLeft: Radius.circular(15.0)),
                    border: Border.all(color: Colors.transparent)),
                alignment: Alignment.bottomLeft,
                child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                          child: Column(
                              mainAxisAlignment: MainAxisAlignment.end,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisSize: MainAxisSize.min,
                              children: [
                            Text(Id,
                                textAlign: TextAlign.left,
                                overflow: TextOverflow.visible,
                                style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 15,
                                    fontWeight: FontWeight.bold)),
                            SizedBox(
                              height: 5,
                            ),
                            Text(Time,
                                textAlign: TextAlign.left,
                                style: TextStyle(
                                  fontSize: 13,
                                  color: Colors.white,
                                )),
                          ])),
                      Container(
                          child: Row(children: [
                        Text("see details",
                            textAlign: TextAlign.right,
                            style: TextStyle(
                              fontSize: 15,
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            )),
                        Icon(
                          Icons.arrow_right_outlined,
                          color: Colors.white,
                          size: 20,
                        ),
                      ]))
                      // RoundedButton(
                      //     text: 'Die',
                      //     press: () {},
                      //     color: kSubColor,
                      //     textColor: kPrimaryColor)
                    ])),
          ],
        ),
      ),
    );
  }
}
