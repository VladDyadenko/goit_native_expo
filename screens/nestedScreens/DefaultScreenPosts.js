import { Text, View, StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { Image, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const PostsScreen = () => {
  const [posts, setPosts] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      {posts && (
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Image
                source={{ uri: item.photo }}
                style={{ width: 350, height: 350, marginTop: 50 }}
              />
            </View>
          )}
        />
      )}
      <Button title="go to map" onPress={() => navigation.navigate("Map")} />
      <Button
        title="go to Comments"
        onPress={() => navigation.navigate("Comments")}
      />
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
