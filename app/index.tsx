import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Index() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setErrore("qualcosa è andato storto");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );

  if (errore)
    return (
      <View style={styles.centro}>
        <Text>{errore}</Text>
      </View>
    );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, justifyContent: "center", alignItems: "center" },
  lista: { padding: 16, gap: 12 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
  },
  titolo: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
    color: "#1a1a1a",
  },
  corpo: { fontSize: 13, color: "#888", lineHeight: 20 },
});
