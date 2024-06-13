import 'package:app/Cart_model.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Purchase extends StatefulWidget {
  const Purchase({super.key});

  @override
  State<Purchase> createState() => _PurchaseState();
}

class _PurchaseState extends State<Purchase> {
  int _quantity = 1;

  void _incrementQuantity() {
    setState(() {
      _quantity++;
    });
  }

  void _decrementQuantity() {
    if (_quantity > 1) {
      setState(() {
        _quantity--;
      });
    }
  }

  void _addToCart(BuildContext context) {
    final item = {
      'name': 'Books',
      'description': 'This is a book of foregin writer',
      'price': 399,
      'quantity': _quantity,
      'image': 'assets/Item1.jpeg',
    };
    Provider.of<CartModel>(context, listen: false).addItem(item);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Added to cart!')),
    );
  }

  @override
  Widget build(BuildContext context) {
    final String productName = 'Men';
    final String productDescription = 'This is a clothing for men wear.';
    final double productPrice = 499;
    final String productImage = 'assets/men1.jpeg'; // Ensure this image exists in your assets folder

    return Scaffold(
      appBar: AppBar(
        title: const Text('Purchase Item'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Image.asset(
                productImage,
                height: 250.0,
                fit: BoxFit.cover,
              ),
            ),
            const SizedBox(height: 16.0),
            Text(
              productName,
              style: const TextStyle(
                fontSize: 24.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8.0),
            Text(
              productDescription,
              style: const TextStyle(
                fontSize: 16.0,
                color: Colors.grey,
              ),
            ),
            const SizedBox(height: 16.0),
            Text(
              '\$${productPrice.toStringAsFixed(2)}',
              style: const TextStyle(
                fontSize: 24.0,
                color: Colors.green,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16.0),
            Row(
              children: [
                const Text(
                  'Quantity:',
                  style: TextStyle(
                    fontSize: 18.0,
                  ),
                ),
                const SizedBox(width: 10.0),
                IconButton(
                  icon: const Icon(Icons.remove),
                  onPressed: _decrementQuantity,
                ),
                Text(
                  '$_quantity',
                  style: const TextStyle(
                    fontSize: 18.0,
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.add),
                  onPressed: _incrementQuantity,
                ),
              ],
            ),
            const Spacer(),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: () => _addToCart(context),
                  child: const Text('Add to Cart'),
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 15.0),
                    textStyle: const TextStyle(fontSize: 18.0),
                  ),
                ),
                const SizedBox(width: 20),
                ElevatedButton(
                  onPressed: () => _makePurchase(context),
                  child: const Text('Purchase'),
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 15.0),
                    textStyle: const TextStyle(fontSize: 18.0),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _makePurchase(BuildContext context) {
    // Implement the purchase logic here
    print('Purchase made: quantity=$_quantity');
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Purchase successful!')),
    );
  }
}
