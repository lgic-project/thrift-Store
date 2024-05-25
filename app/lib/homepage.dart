import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Thrift-Store',
          style: TextStyle(
            fontFamily: 'Pacifico',
            fontSize: 28.0,
          ),
        ),
        backgroundColor: Colors.teal,
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.teal.shade100, Colors.teal.shade400],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: ListView(
          children: [
            const Padding(
              padding: EdgeInsets.all(20.0),
              child: Text(
                'Welcome to Thrift Store!',
                style: TextStyle(
                  fontSize: 28.0,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Featured Items',
                    style: TextStyle(
                      fontSize: 24.0,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 10.0),
                  Container(
                    height: 220.0,
                    child: ListView(
                      scrollDirection: Axis.horizontal,
                      children: [
                        _buildFeaturedItem('assets/Item1.jpeg', 'Item 1', '\$1000'),
                        _buildFeaturedItem('assets/Item2.jpeg', 'Item 2', '\$1500'),
                        _buildFeaturedItem('assets/Item3.jpeg', 'Item 3', '\$2000'),
                        _buildFeaturedItem('assets/Item4.jpeg', 'Item 4', '\$2500'),
                        _buildFeaturedItem('assets/Item5.jpeg', 'Item 5', '\$3000'),
                        _buildFeaturedItem('assets/Item6.jpeg', 'Item 6', '\$3500'),
                        _buildFeaturedItem('assets/Item7.jpeg', 'Item 7', '\$1700'),
                        // Add more featured items here
                      ],
                    ),
                  ),
                ],
              ),
            ),
            // Add more sections or widgets as needed
          ],
        ),
      ),
    );
  }

  Widget _buildFeaturedItem(String imagePath, String name, String price) {
    return Container(
      width: 160.0,
      margin: const EdgeInsets.only(right: 15.0),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(15.0),
        boxShadow: [
          BoxShadow(
            color: Colors.black26,
            blurRadius: 10.0,
            offset: Offset(0, 5),
          ),
        ],
        image: DecorationImage(
          image: AssetImage(imagePath),
          fit: BoxFit.cover,
        ),
      ),
      child: Stack(
        children: [
          Align(
            alignment: Alignment.bottomLeft,
            child: Container(
              padding: const EdgeInsets.all(10.0),
              decoration: BoxDecoration(
                color: Colors.black.withOpacity(0.6),
                borderRadius: BorderRadius.only(
                  bottomLeft: Radius.circular(15.0),
                  bottomRight: Radius.circular(15.0),
                ),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    name,
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 16.0,
                    ),
                  ),
                  Text(
                    price,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 14.0,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
