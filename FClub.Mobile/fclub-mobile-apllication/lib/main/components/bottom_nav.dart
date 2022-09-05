import 'package:UniClub/main/components/app_bar.dart';
import 'package:UniClub/main/constants.dart';
import 'package:UniClub/main/screens/Clubs/clubs_screen.dart';
import 'package:UniClub/main/screens/Events/event_screen.dart';
import 'package:UniClub/main/screens/News/news_screen.dart';
import 'package:UniClub/main/screens/Profile/profile_screen.dart';
import 'package:UniClub/main/screens/Wallet/wallet_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_snake_navigationbar/flutter_snake_navigationbar.dart';

class BottomBar extends StatefulWidget {
  @override
  _SnakeNavigationBarExampleScreenState createState() =>
      _SnakeNavigationBarExampleScreenState();
}

class _SnakeNavigationBarExampleScreenState extends State<BottomBar> {
  final BorderRadius _borderRadius = const BorderRadius.only(
    topLeft: Radius.circular(25),
    topRight: Radius.circular(25),
  );

  ShapeBorder? bottomBarShape = const RoundedRectangleBorder(
    borderRadius: BorderRadius.all(Radius.circular(25)),
  );
  SnakeBarBehaviour snakeBarStyle = SnakeBarBehaviour.floating;
  EdgeInsets padding = const EdgeInsets.all(12);

  int _selectedItemPosition = 2;
  SnakeShape snakeShape = SnakeShape.circle;

  String title = 'Home';

  bool showSelectedLabels = false;
  bool showUnselectedLabels = false;

  Color selectedColor = kPrimaryColor;
  Gradient selectedGradient =
      const LinearGradient(colors: [Colors.red, Colors.amber]);

  Color unselectedColor = Colors.blueGrey;
  Gradient unselectedGradient =
      const LinearGradient(colors: [Colors.red, Colors.blueGrey]);

  Color? containerColor;
  List<Color> containerColors = [
    const Color(0xFFFDE1D7),
    const Color(0xFFE4EDF5),
    const Color(0xFFE7EEED),
    const Color(0xFFF4E4CE),
  ];

  static List<Widget> _widgetOptions = <Widget>[
    ClubOver(),
    // NewsScreen(),
    EventScreen(),
    NewsScreen(),
    WalletScreen(),
    ProfileScreen()
    // ProfilePage()
  ];

  void _onItemTapped(int index) {
    setState(() {
      switch (index) {
        case 0:
          setState(() {
            title = "Club";
          });
          break;
        case 1:
          setState(() {
            title = "Event";
          });
          break;
        case 2:
          setState(() {
            title = "Home";
          });
          break;
        case 3:
          setState(() {
            title = "Wallet";
          });
          break;
        case 4:
          setState(() {
            title = "Profile";
          });
          break;
      }
      _selectedItemPosition = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: TitleBar(title),
      body: Center(
        child: _widgetOptions.elementAt(_selectedItemPosition),
      ),
      bottomNavigationBar: SnakeNavigationBar.color(
        // height: 80,
        behaviour: snakeBarStyle,
        snakeShape: snakeShape,
        shape: bottomBarShape,
        padding: padding,

        ///configuration for SnakeNavigationBar.color
        snakeViewColor: selectedColor,
        selectedItemColor:
            snakeShape == SnakeShape.indicator ? selectedColor : null,
        unselectedItemColor: Colors.blueGrey,

        ///configuration for SnakeNavigationBar.gradient
        // snakeViewGradient: selectedGradient,
        // selectedItemGradient: snakeShape == SnakeShape.indicator ? selectedGradient : null,
        // unselectedItemGradient: unselectedGradient,

        showUnselectedLabels: showUnselectedLabels,
        showSelectedLabels: showSelectedLabels,

        currentIndex: _selectedItemPosition,
        onTap: _onItemTapped,
        items: [
          const BottomNavigationBarItem(
              icon: Icon(Icons.workspaces), label: 'clubs'),
          const BottomNavigationBarItem(
              icon: Icon(Icons.date_range_sharp), label: 'Events'),
          const BottomNavigationBarItem(icon: Icon(Icons.home), label: 'home'),
          const BottomNavigationBarItem(
              icon: Icon(Icons.account_balance_wallet), label: 'wallet'),
          const BottomNavigationBarItem(
              icon: Icon(Icons.account_circle), label: 'profile')
        ],
        selectedLabelStyle: const TextStyle(fontSize: 14),
        unselectedLabelStyle: const TextStyle(fontSize: 10),
      ),
    );
  }
}
