import 'package:app/Settings.dart';
import 'package:app/main.dart';
import 'package:app/my_favorite.dart';
import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Thrift Store'),
        actions: [
          IconButton(
            icon: Icon(Icons.favorite),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => FavouritesPage()),
              );
            },
          ),
          IconButton(
            icon: Icon(Icons.settings),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => SettingsPage()),
              );
            },
          ),
        ],
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
            _buildCategorySection(
              context: context,
              title: 'Books',
              items: [
                _buildFeaturedItem(context, 'assets/Item1.jpeg', 'Item 1', '\1000'),
                _buildFeaturedItem(context, 'assets/Item2.jpeg', 'Item 2', '\1500'),
                _buildFeaturedItem(context, 'assets/Item3.jpeg', 'Item 3', '\2000'),
              ],
            ),
            _buildCategorySection(
              context: context,
              title: 'Men',
              items: [
                _buildFeaturedItem(context, 'assets/men1.jpeg', 'Men Item 1', '\1000'),
                _buildFeaturedItem(context, 'assets/men2.jpeg', 'Men Item 2', '\1500'),
                _buildFeaturedItem(context, 'assets/men3.jpeg', 'Men Item 3', '\2000'),
                // Add more men's items here
              ],
            ),
            _buildCategorySection(
              context: context,
              title: 'Women',
              items: [
                _buildFeaturedItem(context, 'assets/women1.jpeg', 'Women Item 1', '\1200'),
                _buildFeaturedItem(context, 'assets/women2.jpeg', 'Women Item 2', '\1600'),
                _buildFeaturedItem(context, 'assets/women3.jpeg', 'Women Item 3', '\1800'),
                // Add more women's items here
              ],
            ),
            _buildCategorySection(
              context: context,
              title: 'Children',
              items: [
                _buildFeaturedItem(context, 'assets/children1.jpeg', 'Children Item 1', '\800'),
                _buildFeaturedItem(context, 'assets/children2.jpeg', 'Children Item 2', '\900'),
                _buildFeaturedItem(context, 'assets/children3.jpeg', 'Children Item 3', '\1000'),
                // Add more children's items here
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCategorySection({required BuildContext context, required String title, required List<Widget> items}) {
    return Container(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
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
              children: items,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFeaturedItem(BuildContext context, String imagePath, String name, String price) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => MyApp(
              title: name,
              image: imagePath,
              price: price,
            ),
          ),
        );
      },
      child: Container(
        width: 160.0,
        margin: const EdgeInsets.only(right: 15.0),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(15.0),
          boxShadow: [
            BoxShadow(
              color: Colors.black26,
              blurRadius: 10.0,
              offset: const Offset(0, 5),
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
                  borderRadius: const BorderRadius.only(
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
      ),
    );
  }
}
