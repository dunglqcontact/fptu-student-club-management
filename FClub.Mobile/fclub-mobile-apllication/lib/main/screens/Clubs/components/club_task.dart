import 'package:UniClub/main/constants.dart';
import 'package:UniClub/main/screens/Clubs/components/task_card.dart';
import 'package:UniClub/main/screens/Events/components/event_calendar.dart';
import 'package:UniClub/main/screens/Events/components/event_detail.dart';
import 'package:UniClub/main/screens/Events/components/event_landing.dart';
import 'package:UniClub/model/club.dart';
import 'package:UniClub/network/club_request.dart';
import 'package:flutter/painting.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class ClubTask extends StatefulWidget {
  final String? clubId;
  ClubTask(this.clubId, {Key? key}) : super(key: key);
  @override
  _ClubTaskState createState() => _ClubTaskState();
}

class _ClubTaskState extends State<ClubTask> {
  List<Tasks>? data;
  @override
  void initState() {
    // TODO: implement initState
    ClubRequest.fetchClubsById(widget.clubId).then((dataFromServer) {
      setState(() {
        data = dataFromServer.members?.first.tasks;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Padding(
        padding: EdgeInsets.fromLTRB(8, 5, 8, 5),
        child: Column(children: [
          Flexible(
              child: ListView.separated(
            padding: EdgeInsets.fromLTRB(0, 20, 0, 20),
            itemCount: data?.length ?? 0,
            itemBuilder: (context, index) {
              return TaskCard(
                content: '${data?[index].content}',
                press: () {},
                award: data?[index].awardPoint ?? 0,
                penalty: data?[index].pennaltyPoint ?? 0,
                Begintime: DateFormat("dd/MM/yyyy")
                    .format(data?[index].beginDate ?? DateTime.now()),
                Duetime: DateFormat("dd/MM/yyyy")
                    .format(data?[index].dueDate ?? DateTime.now()),
                title: '${data?[index].title}',
                status: data?[index].status ?? true,
              );
            },
            separatorBuilder: (BuildContext context, int index) =>
                const SizedBox(height: 10),
          ))
        ]));
  }
}
