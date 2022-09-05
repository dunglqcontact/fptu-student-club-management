import 'package:UniClub/main/components/search_widget.dart';
import 'package:UniClub/main/screens/Clubs/components/club_detail.dart';
import 'package:UniClub/model/approve.dart';
import 'package:UniClub/model/member.dart';
import 'package:UniClub/model/user.dart';
import 'package:UniClub/network/user_request.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:UniClub/main/Screens/Clubs/components/club_card_info.dart';
import 'package:UniClub/network/club_request.dart';

class DiscoveryClub extends StatefulWidget {
  @override
  ListClubState createState() => ListClubState();
}

class ListClubState extends State<DiscoveryClub> {
  Student? user;
  List<Approve>? clubs;
  List<Approve>? data;
  String text = "";
  // }
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    UserRequest.fetchUserByEmail(FirebaseAuth.instance.currentUser!.email)!
        .then((dataFromServer) {
      setState(() {
        user = dataFromServer;
      });
      ClubRequest.fetchClubsWithApprove(user?.data?.first.id)
          .then((dataFromServer) {
        setState(() {
          clubs = dataFromServer;
          data = clubs
              ?.where((element) => element.value!.startsWith("N"))
              .toList();
        });
      });
    });
  }

  Future search(String text) async {
    UserRequest.fetchUserByEmail(FirebaseAuth.instance.currentUser!.email)!
        .then((dataFromServer) {
      setState(() {
        user = dataFromServer;
      });
      ClubRequest.fetchSearchClubsWithApprove(user?.data?.first.id, text)
          .then((dataFromServer) {
        setState(() {
          clubs = dataFromServer;
          data = clubs
              ?.where((element) => element.value!.startsWith("N"))
              .toList();
        });
      });
    });
  }

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
  }

  Widget buildSearch() => SearchWidget(
        text: text,
        hintText: 'Search club',
        onChanged: search,
      );

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        buildSearch(),
        Expanded(
          child: SizedBox(
            child: new ListView.separated(
              padding: EdgeInsets.all(8),
              itemCount: data?.length ?? 0,
              itemBuilder: (context, index) {
                return ClubCard(
                    Status: "Not joined",
                    isJoined: data?[index].value == "Waitting" ? false : true,
                    pageRoute: ClubDetail(data?[index].key?.id, false),
                    logoUrl: '${data?[index].key?.logo}',
                    Id: '${data?[index].key?.id}',
                    Name: '${data?[index].key?.name}');
              },
              separatorBuilder: (BuildContext context, int index) =>
                  const SizedBox(height: 10),
            ),
          ),
        ),
      ],
    );
  }
}
