import 'package:flutter/material.dart';
import 'package:UniClub/main/constants.dart';

class ClubCard extends StatelessWidget {
  final Widget pageRoute;
  final String logoUrl;
  final String Id;
  final String Name;
  final String Status;
  bool? isJoined = false;
  ClubCard(
      {Key? key,
      this.isJoined,
      required this.pageRoute,
      required this.logoUrl,
      required this.Id,
      required this.Name,
      required this.Status})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return InkWell(
      onTap: () => isJoined == true
          ? Navigator.push(
              context, MaterialPageRoute(builder: (context) => pageRoute))
          : null,
      child: Container(
        width: size.width,
        height: 80.0,
        decoration: BoxDecoration(
          border: Border.all(
            color: kPrimaryColor,
          ),
          color: Colors.white,
          borderRadius: BorderRadius.circular(10.0),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            SizedBox(
              width: 18,
            ),
            Container(
              height: 50,
              width: 50,
              decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  image: new DecorationImage(
                      image: NetworkImage(logoUrl), fit: BoxFit.fitHeight)),
            ),
            Container(
                padding: EdgeInsets.fromLTRB(18, 18, 0, 18),
                child: Expanded(
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                      Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Container(
                              width: size.width * 0.3,
                              child: Text(Id,
                                  textAlign: TextAlign.left,
                                  style: TextStyle(
                                    color: kPrimaryColor,
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                  )),
                            ),
                            Text(
                              Status,
                              style: TextStyle(
                                  color: Status == "Joined"
                                      ? Colors.green
                                      : Colors.orange,
                                  fontSize: 13,
                                  fontWeight: FontWeight.bold),
                            )
                          ]),
                      SizedBox(
                        height: 7,
                      ),
                      Expanded(
                        child: Text(Name,
                            softWrap: true,
                            overflow: TextOverflow.ellipsis,
                            textAlign: TextAlign.left,
                            style: TextStyle(
                              fontSize: 13,
                              color: Colors.black87,
                            )),
                      )
                    ])))
          ],
        ),
      ),
    );
  }
}
