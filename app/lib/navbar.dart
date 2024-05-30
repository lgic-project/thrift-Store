import 'package:app/booking.dart';
import 'package:app/homepage.dart';
import 'package:app/profile.dart';
import 'package:app/store.dart';
import 'package:flutter/material.dart';

class NavigatorScaffold extends StatefulWidget {
  const NavigatorScaffold({super.key});

  @override
  State<NavigatorScaffold> createState() => _NavigatorScaffoldState();
}

class _NavigatorScaffoldState extends State<NavigatorScaffold> {
  int currentIndex = 0;
  Color? unSelectedItemColor = Colors.white;
  Color? selectedItemColor = Color(0xFF191645);
  late Widget currentBody;

  @override
  Widget build(BuildContext context) {
    switch (currentIndex) {
      case 0:
        currentBody = HomePage();
        break;
      case 1:
        currentBody = Store();

        break;
      case 2:
        currentBody = Booking();
        break;
      case 3:
        currentBody = ProfilePage();
        break;
    }
    return Scaffold(
      extendBody: true,
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(kToolbarHeight),
        child: ClipRRect(
          borderRadius: BorderRadius.only(
            bottomLeft: Radius.circular(5),
            bottomRight: Radius.circular(5),
          ),
          child: AppBar(
            automaticallyImplyLeading: false,
            title: const Text('Thrift Store'),
            backgroundColor: Theme.of(context).primaryColor,
          ),
        ),
      ),
      body: currentBody,
      bottomNavigationBar: ClipRRect(
        // borderRadius: BorderRadius.only(
        //   topLeft: Radius.circular(40),
        //   topRight: Radius.circular(40),
        // ),
        
        child: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          backgroundColor: Theme.of(context).primaryColor,
          items: [
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.abc_outlined),
              label: 'Chat',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.request_page_sharp),
              label: 'Booking',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person),
              label: 'Profile',
            ),
          ],
          currentIndex: currentIndex,
          selectedItemColor: selectedItemColor,
          unselectedItemColor: unSelectedItemColor,
          onTap: (index) {
            setState(() {
              currentIndex = index;
            });
          },
        ),
      ),
    );
  }
}