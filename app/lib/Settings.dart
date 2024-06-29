import 'package:flutter/material.dart';

class SettingsPage extends StatefulWidget {
  @override
  _SettingsPageState createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  List<String> _blockedUsers = [];
  TextEditingController _blockUserController = TextEditingController();
  TextEditingController _currentPasswordController = TextEditingController();
  TextEditingController _newPasswordController = TextEditingController();
  TextEditingController _confirmPasswordController = TextEditingController();

  void _blockUser() {
    if (_blockUserController.text.isNotEmpty) {
      setState(() {
        _blockedUsers.add(_blockUserController.text);
        _blockUserController.clear();
      });
    }
  }

  void _unblockUser(String user) {
    setState(() {
      _blockedUsers.remove(user);
    });
  }

  void _changePassword() {
    // Implement password change logic
    // Ensure current password is correct
    // Validate new password and confirm password
    // Update password
    if (_currentPasswordController.text.isNotEmpty &&
        _newPasswordController.text == _confirmPasswordController.text) {
      // Perform password change operation
      // For example, call an API to change the password
      print('Password changed successfully');
      _currentPasswordController.clear();
      _newPasswordController.clear();
      _confirmPasswordController.clear();
    } else {
      print('Password change failed');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Settings'),
      ),
      body: ListView(
        padding: EdgeInsets.all(16.0),
        children: [
          Text(
            'Block User',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          TextField(
            controller: _blockUserController,
            decoration: InputDecoration(
              hintText: 'Enter username to block',
            ),
          ),
          SizedBox(height: 10),
          ElevatedButton(
            onPressed: _blockUser,
            child: Text('Block User'),
          ),
          SizedBox(height: 20),
          Text(
            'Blocked Users',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          ..._blockedUsers.map((user) => ListTile(
                title: Text(user),
                trailing: IconButton(
                  icon: Icon(Icons.block),
                  onPressed: () => _unblockUser(user),
                ),
              )),
          SizedBox(height: 20),
          Text(
            'Change Password',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          TextField(
            controller: _currentPasswordController,
            decoration: InputDecoration(
              hintText: 'Current Password',
            ),
            obscureText: true,
          ),
          SizedBox(height: 10),
          TextField(
            controller: _newPasswordController,
            decoration: InputDecoration(
              hintText: 'New Password',
            ),
            obscureText: true,
          ),
          SizedBox(height: 10),
          TextField(
            controller: _confirmPasswordController,
            decoration: InputDecoration(
              hintText: 'Confirm New Password',
            ),
            obscureText: true,
          ),
          SizedBox(height: 10),
          ElevatedButton(
            onPressed: _changePassword,
            child: Text('Change Password'),
          ),
        ],
      ),
    );
  }
}
