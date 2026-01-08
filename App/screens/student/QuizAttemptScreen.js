import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import TopNav from "../../components/TopNav";

const Option = ({ label, selected, onPress }) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <View style={[styles.radio, selected && styles.radioSelected]} />
    <Text style={styles.optionText}>{label}</Text>
  </TouchableOpacity>
);

const QuestionCard = ({ number, question, options, code }) => {
  const [selected, setSelected] = useState(0);

  return (
    <View style={styles.questionCard}>
      <Text style={styles.questionText}>
        {number}. {question}
      </Text>

      {code && (
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>{code}</Text>
        </View>
      )}

      {options.map((opt, index) => (
        <Option
          key={index}
          label={opt}
          selected={selected === index}
          onPress={() => setSelected(index)}
        />
      ))}
    </View>
  );
};

export default function QuizAttemptScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TopNav activeNav={"Dashboard"} />
      <View style={{ width: "100%", height: 100 }}></View>

      {/* Top bar */}
      <View style={styles.topBar}>
        <Ionicons name="arrow-back" size={22} color="#f97316" />
        <Text style={styles.topMeta}>
          10 Questions · 20 minutes · 10 points
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <QuestionCard
          number={1}
          question='What is the correct syntax to output "Hello, World" in Python?'
          options={[
            'print "Hello, World"',
            'echo("Hello, World")',
            'print("Hello, World")',
            'System.out.print("Hello, World")',
          ]}
        />

        <QuestionCard
          number={2}
          question="Which of the following is a valid variable name in Python?"
          options={["2name", "my-name", "my_name", "my name"]}
        />

        <QuestionCard
          number={3}
          question="What data type is the result of: type(5.0)?"
          options={["int", "str", "float", "bool"]}
        />

        <QuestionCard
          number={4}
          question="Which of the following is used to get input from the user in Python?"
          options={["input()", "get()", "scan()", "prompt()"]}
        />

        <QuestionCard
          number={5}
          question="What will the following code output?"
          code={`x = 3\ny = 2\nprint(x + y)`}
          options={["32", "3 + 2", "5", "None"]}
        />

        {/* Footer */}
        <View style={styles.footer}>
          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.submitBtn}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.draftBtn}>
              <Text style={styles.draftText}>Save draft</Text>
            </TouchableOpacity>
          </View>

          {/* Pagination */}
          <View style={styles.pagination}>
            <View style={[styles.page, styles.pageActive]}>
              <Text style={styles.pageTextActive}>1</Text>
            </View>

            <View style={styles.page}>
              <Text style={styles.pageText}>2</Text>
            </View>

            <View style={styles.page}>
              <Text style={styles.pageText}>3</Text>
            </View>

            <View style={styles.page}>
              <Text style={styles.pageText}>Next</Text>
            </View>
          </View>
        </View>

        <View style={{ width: "100%", height: 100 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* Top */
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    width: "90%",
    alignSelf: "center",
  },
  topMeta: {
    color: "#aaa",
  },

  content: {
    padding: 16,
    width: "90%",
    alignSelf: "center",

    height: 1,
  },

  /* Question Card */
  questionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#f97316",
    marginBottom: 16,
  },
  questionText: {
    fontWeight: "600",
    marginBottom: 12,
  },

  /* Options */
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#000",
  },
  radioSelected: {
    backgroundColor: "#000",
  },
  optionText: {
    fontSize: 13,
  },

  /* Code */
  codeBlock: {
    backgroundColor: "#eee",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  codeText: {
    fontFamily: "monospace",
    fontSize: 13,
  },

  /* Actions */
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  submitBtn: {
    backgroundColor: "#f97316",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  submitText: {
    color: "#000",
    fontWeight: "700",
  },
  draftBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  draftText: {
    fontWeight: "600",
  },

  /* Pagination */
  pagination: {
    flexDirection: "row",
    gap: 8,
    marginTop: 20,
    alignItems: "center",
  },
  page: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  pageActive: {
    backgroundColor: "#f97316",
  },
  pageText: {
    fontWeight: "600",
  },
  pageTextActive: {
    fontWeight: "700",
    color: "#000",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    flexWrap: "wrap", // helps on small screens
  },

  actions: {
    flexDirection: "row",
    gap: 12,
  },

  pagination: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});
