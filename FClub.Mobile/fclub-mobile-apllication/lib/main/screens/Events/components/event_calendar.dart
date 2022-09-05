import 'package:UniClub/main/constants.dart';
import 'package:UniClub/model/event.dart';
import 'package:UniClub/network/event_request.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';

class EventCalender extends StatefulWidget {
  @override
  _CalendarState createState() => _CalendarState();
}

class _CalendarState extends State<EventCalender> {
  List<Data>? events;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SfCalendar(
      view: CalendarView.timelineMonth,
      dataSource: EventDataSource(events ?? []),
      monthViewSettings: MonthViewSettings(
          appointmentDisplayMode: MonthAppointmentDisplayMode.appointment),
    ));
  }

  @override
  void initState() {
    // TODO: implement initState
    EventRequest.fetchAvailableEvents().then((dataFromServer) {
      setState(() {
        events = dataFromServer.data!.toList();
      });
    });
  }
}

class EventDataSource extends CalendarDataSource {
  EventDataSource(List<Data> source) {
    appointments = source;
  }

  @override
  DateTime getStartTime(int index) {
    return appointments?[index].beginDate ?? DateTime.now();
  }

  @override
  DateTime getEndTime(int index) {
    return appointments?[index].dueDate ?? DateTime.now();
  }

  @override
  String getSubject(int index) {
    return appointments?[index].title ?? "null";
  }

  @override
  Color getColor(int index) {
    return kPrimaryColor;
  }

  @override
  bool isAllDay(int index) {
    return true;
  }
}
