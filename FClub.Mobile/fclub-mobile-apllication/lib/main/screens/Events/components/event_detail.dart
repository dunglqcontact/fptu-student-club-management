import 'package:UniClub/main/components/rounded_button.dart';
import 'package:UniClub/main/components/sub_appbar.dart';
import 'package:UniClub/main/constants.dart';
import 'package:UniClub/model/event.dart';
import 'package:UniClub/network/event_request.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class EventDetail extends StatefulWidget {
  final int? eventId;
  EventDetail(this.eventId, {Key? key}) : super(key: key);
  @override
  _EventDetailState createState() => _EventDetailState();
}

class _EventDetailState extends State<EventDetail> {
  Data? eventinfo;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    EventRequest.fetchEventById(widget.eventId).then((datafromserver) {
      setState(() {
        eventinfo = datafromserver.data?.first;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      appBar: SubBar("Event Detail"),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              width: size.width * 0.9,
              height: size.height * 0.4,
              decoration: BoxDecoration(
                  border: Border.all(
                    color: kPrimaryColor,
                  ),
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(15.0),
                  image: DecorationImage(
                      image: NetworkImage(eventinfo?.image ?? ""),
                      fit: BoxFit.fitHeight)),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Container(
                      padding: EdgeInsets.fromLTRB(18, 5, 18, 10),
                      width: size.width,
                      height: size.height * 0.05,
                      decoration: BoxDecoration(
                          color: kPrimaryColor.withOpacity(0.8),
                          borderRadius: BorderRadius.only(
                              bottomRight: Radius.circular(15.0),
                              bottomLeft: Radius.circular(15.0)),
                          border: Border.all(color: Colors.transparent)),
                      alignment: Alignment.bottomLeft,
                      child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Container(
                              child: Text.rich(
                                TextSpan(
                                  text: "Begin from " +
                                      (DateFormat("dd/MM/yyyy").format(
                                          eventinfo?.beginDate ??
                                              DateTime.now())) +
                                      " to " +
                                      (DateFormat("dd/MM/yyyy").format(
                                          eventinfo?.beginDate ??
                                              DateTime.now())),
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                      decorationStyle:
                                          TextDecorationStyle.solid),
                                ),
                              ),
                            ),
                          ])),
                ],
              ),
            ),
            Container(
                padding: EdgeInsets.fromLTRB(30, 0, 30, 0),
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      SizedBox(
                        height: 15.0,
                      ),
                      Text(eventinfo?.title ?? "",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                              color: kPrimaryColor,
                              fontSize: 30,
                              fontWeight: FontWeight.bold,
                              decorationStyle: TextDecorationStyle.solid)),
                      SizedBox(
                        height: 15.0,
                      ),
                      Container(
                          child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                            Text.rich(
                              TextSpan(
                                  text: "Content: ",
                                  style: TextStyle(
                                      color: kPrimaryColor,
                                      fontSize: 20,
                                      fontWeight: FontWeight.bold,
                                      decorationStyle:
                                          TextDecorationStyle.solid),
                                  children: <TextSpan>[
                                    TextSpan(
                                      text: eventinfo?.content ?? "",
                                      style: TextStyle(
                                          color: Colors.black87,
                                          fontSize: 20,
                                          fontWeight: FontWeight.w400,
                                          decorationStyle:
                                              TextDecorationStyle.solid),
                                    )
                                  ]),
                            ),
                            Text.rich(
                              TextSpan(
                                  text: "Location: ",
                                  style: TextStyle(
                                      color: kPrimaryColor,
                                      fontSize: 20,
                                      fontWeight: FontWeight.bold,
                                      decorationStyle:
                                          TextDecorationStyle.solid),
                                  children: <TextSpan>[
                                    TextSpan(
                                      text: eventinfo?.location ?? "",
                                      style: TextStyle(
                                          color: Colors.black87,
                                          fontSize: 20,
                                          fontWeight: FontWeight.w400,
                                          decorationStyle:
                                              TextDecorationStyle.solid),
                                    )
                                  ]),
                            ),
                            SizedBox(
                              height: 15.0,
                            ),
                          ])),
                      RoundedButton(
                        text: "Register",
                        press: () {},
                        color: kPrimaryColor,
                        textColor: Colors.white,
                      )
                    ]))
          ],
        ),
      ),
    );
  }
}
