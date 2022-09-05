import 'package:flutter/material.dart';
import 'package:UniClub/main/Screens/Clubs/components/discovery_club.dart';
import 'package:UniClub/main/constants.dart';
import 'package:UniClub/main/screens/Clubs/components/your_club.dart';

class ClubOver extends StatefulWidget {
  @override
  ClubScreen createState() => ClubScreen();
}

class ClubScreen extends State<ClubOver> with SingleTickerProviderStateMixin {
  // ignore: unused_field
  TabController? controller;
  // late Future<Post> futurePost;

  @override
  void initState() {
    // TODO: implement initState
    controller = TabController(length: 2, vsync: this);
    // futurePost = NetworkRequest.fetchClubs();
    super.initState();
  }

  @override
  void dispose() {
    // TODO: implement dispose
    controller!.dispose();
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 10),
        child: Column(
          children: [
            // give the tab bar a height [can change hheight to preferred height]
            Container(
              width: size.width * 0.6,
              height: 45,
              decoration: BoxDecoration(
                color: kSubColor,
                borderRadius: BorderRadius.circular(
                  15.0,
                ),
              ),
              child: TabBar(
                indicatorSize: TabBarIndicatorSize.tab,
                controller: controller,
                // give the indicator a decoration (color and border radius)
                indicator: BoxDecoration(
                  borderRadius: BorderRadius.circular(
                    15.0,
                  ),
                  color: kPrimaryColor,
                ),
                labelColor: Colors.white,
                unselectedLabelColor: kPrimaryColor,
                tabs: [
                  // first tab [you can add an icon using the icon property]
                  Tab(
                    text: 'My Clubs',
                  ),

                  // second tab [you can add an icon using the icon property]
                  Tab(
                    text: 'Discovery',
                  ),
                ],
              ),
            ),
            SizedBox(height: 20),
            // tab bar view here
            Expanded(
              child: TabBarView(
                controller: controller,
                children: [
                  // first tab bar view widget

                  YourClub(),

                  // second tab bar view widget
                  DiscoveryClub(),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
