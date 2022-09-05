import 'package:UniClub/main/constants.dart';
import 'package:UniClub/main/screens/Events/components/event_calendar.dart';
import 'package:UniClub/main/screens/Events/components/event_detail.dart';
import 'package:flutter/painting.dart';
import 'package:UniClub/model/event.dart';
import 'package:UniClub/network/event_request.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import 'components/event_landing.dart';

class EventScreen extends StatefulWidget {
  @override
  _EventState createState() => _EventState();
}

class _EventState extends State<EventScreen> {
  List<Data>? data;
  List<Data>? incoming;
  List<Data>? available;
  List<Data>? joined;
  String? dropdownValue = "All Available Events";
  bool showCalendar = false;
  @override
  void initState() {
    // TODO: implement initState
    EventRequest.fetchAvailableEventsSortDate("CreateDate", "desc")
        .then((dataFromServer) {
      setState(() {
        data = dataFromServer.data!.toList();
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Padding(
        padding: EdgeInsets.fromLTRB(20, 0, 20, 0),
        child: Column(children: [
          Visibility(
            visible: showCalendar,
            child: Container(
              height: size.height * 0.3,
              child: EventCalender(),
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text("Following All The Events !",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                      color: kPrimaryColor,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      decorationStyle: TextDecorationStyle.solid)),
              // DropdownButton<String>(
              //   value: dropdownValue,
              //   icon: const Icon(Icons.arrow_drop_down, color: kPrimaryColor),
              //   iconSize: 24,
              //   elevation: 16,
              //   style: const TextStyle(
              //       fontSize: 20,
              //       fontWeight: FontWeight.bold,
              //       color: kPrimaryColor),
              //   onChanged: (String? newValue) {
              //     setState(() {
              //       dropdownValue = newValue!;
              //     });
              //   },
              //   items: <String>[
              //     'All Available Events',
              //     'Incoming Events',
              //     'Joined Events'
              //   ].map<DropdownMenuItem<String>>((String value) {
              //     return DropdownMenuItem<String>(
              //       value: value,
              //       child: Text(value),
              //     );
              //   }).toList(),
              // ),
              IconButton(
                  iconSize: 24,
                  onPressed: () => setState(() {
                        !showCalendar
                            ? showCalendar = true
                            : showCalendar = false;
                      }),
                  icon: Icon(
                    Icons.calendar_today_outlined,
                    color: kPrimaryColor,
                    size: 20,
                  ))
            ],
          ),
          Flexible(
              child: ListView.separated(
            padding: EdgeInsets.all(20),
            itemCount: data?.length ?? 0,
            itemBuilder: (context, index) {
              return EventCard(
                  pageRoute: EventDetail(data?[index].id),
                  image: '${data?[index].image}',
                  Time: '${DateFormat("dd/MM/yyyy").format(data?[index].beginDate ?? DateTime.now())}' +
                      ' - ' +
                      '${DateFormat("dd/MM/yyyy").format(data?[index].dueDate ?? DateTime.now())}',
                  Id: '${data?[index].title}');
            },
            separatorBuilder: (BuildContext context, int index) =>
                const SizedBox(height: 10),
          ))
        ]));
  }
}
