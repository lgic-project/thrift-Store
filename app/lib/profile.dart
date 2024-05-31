import 'package:flutter/material.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('profile'),
        backgroundColor: Colors.green,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: <Widget>[
            Center(
              child: CircleAvatar(
                radius: 50,
                backgroundImage: AssetImage('assets/Profile_picture.jpeg'),
              ),
            ),
            SizedBox(height: 20),
            Text(
              'anish thapa',
              style: TextStyle(
                fontSize: 23,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 10),
            Text(
              'thapaanish793@gmail.com',
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey,
              ),
            ),
            SizedBox(height: 20),
            ListTile(
              leading: Icon(Icons.edit),
              title: Text('Edit Profile'),
              onTap: () {
                // Navigate to edit profile
              },
            ),
            ListTile(
              leading: Icon(Icons.shopping_bag),
              title: Text('My_purchase'),
              onTap: () {
                // Navigate to purchase
              },
            ),
            ListTile(
              leading: Icon(Icons.favorite),
              title: Text('My_favorites'),
              onTap: () {
                // Navigate to favorites
              },
            ),
            ListTile(
              leading: Icon(Icons.settings),
              title: Text('Settings'),
              onTap: () {
                // Navigate to settings
              },
            ),
            ListTile(
              leading: Icon(Icons.logout),
              title: Text('logout'),
              onTap: () {
                // handle logout
              },
            ),
          ],
        ),
      ),
    );
  }
}