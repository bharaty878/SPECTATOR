import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch('https://dev.smartcookie.in/core/Version3/display_couponlist_webservice.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cp_stud_id: '15',
            stud_mem_id: '0',
            school_id: '119',
            status: 'no',
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        if (result.responseStatus === 200) {
          setCoupons(result.posts.map(post => post.post));
        } else {
          throw new Error(result.responseMessage || 'Failed to fetch data');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.cpCode}>Code: {item.cp_code}</Text>
      <Text style={styles.amount}>Amount: ${item.amount}</Text>
      <Text style={styles.status}>Status: {item.status}</Text>
      <Text style={styles.cpGenDate}>Generated Date: {item.cp_gen_date}</Text>
      <Text style={styles.validity}>Validity: {item.validity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={coupons}
        keyExtractor={(item) => item.cp_code}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
  },
  cpCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  amount: {
    fontSize: 16,
    color: '#4CAF50',
    marginVertical: 4,
  },
  status: {
    fontSize: 14,
    color: '#757575',
    marginVertical: 2,
  },
  cpGenDate: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  validity: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
  },
});

export default Coupon;














// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

// const Coupon = () => {
//   const [coupons, setCoupons] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCoupons = async () => {
//       try {
//         const response = await fetch('https://dev.smartcookie.in/core/Version3/display_couponlist_webservice.php', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             cp_stud_id: '15',
//             stud_mem_id: '0',
//             school_id: '119',
//             status: 'no',
//           }),
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const result = await response.json();

//         if (result.responseStatus === 200) {
//           setCoupons(result.posts.map(post => post.post));
//         } else {
//           throw new Error(result.responseMessage || 'Failed to fetch data');
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCoupons();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text>Error: {error}</Text>
//       </View>
//     );
//   }

//   const renderItem = ({ item }) => (
//     <View style={styles.itemContainer}>
//       <Text style={styles.cpCode}>Code: {item.cp_code}</Text>
//       <Text style={styles.amount}>Amount: ${item.amount}</Text>
//       <Text style={styles.status}>Status: {item.status}</Text>
//       <Text style={styles.cpGenDate}>Generated Date: {item.cp_gen_date}</Text>
//       <Text style={styles.validity}>Validity: {item.validity}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={coupons}
//         keyExtractor={(item) => item.cp_code}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   itemContainer: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     width: '100%',
//   },
//   cpCode: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   amount: {
//     fontSize: 14,
//   },
//   status: {
//     fontSize: 14,
//     color: 'gray',
//   },
//   cpGenDate: {
//     fontSize: 12,
//     color: 'darkgray',
//   },
//   validity: {
//     fontSize: 12,
//     color: 'darkgray',
//   },
// });


// export default Coupon;










