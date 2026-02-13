import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import TopNav from "../../components/TopNav";
import StudentBottomNav from "../../components/StudentBottomNav";

const Option = ({ label, selected, onPress, isMobile }) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <View style={[styles.radio, selected && styles.radioSelected]} />
    <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const QuestionCard = ({ number, question, options, code, totalQuestions }) => {
  const [selected, setSelected] = useState(null);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.questionCard}>
      <View style={styles.questionHeader}>
        <View style={styles.questionBadge}>
          <Text style={styles.questionNumber}>Question {number}</Text>
          <Text style={styles.questionMeta}>of {totalQuestions}</Text>
        </View>
        <View style={styles.pointsBadge}>
          <Ionicons name="star" size={14} color="#FFB800" />
          <Text style={styles.pointsText}>2 points</Text>
        </View>
      </View>

      <Text style={styles.questionText}>{question}</Text>

      {code && (
        <View style={styles.codeBlock}>
          <View style={styles.codeHeader}>
            <Ionicons name="code-slash" size={16} color="#666" />
            <Text style={styles.codeHeaderText}>Code snippet</Text>
          </View>
          <Text style={styles.codeText}>{code}</Text>
        </View>
      )}

      <View style={styles.optionsContainer}>
        {options.map((opt, index) => (
          <Option
            key={index}
            label={opt}
            selected={selected === index}
            onPress={() => setSelected(index)}
            isMobile={isMobile}
          />
        ))}
      </View>

      <View style={styles.questionFooter}>
        <TouchableOpacity style={styles.flagBtn}>
          <Ionicons name="flag-outline" size={16} color="#666" />
          <Text style={styles.flagText}>Flag for review</Text>
        </TouchableOpacity>
        <Text style={styles.questionStatus}>
          {selected !== null ? "Answered" : "Not answered"}
        </Text>
      </View>
    </View>
  );
};

export default function QuizAttemptScreen() {
  const { width } = useWindowDimensions();
  const [currentPage, setCurrentPage] = useState(1);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const styles = isMobile
    ? mobileStyles
    : isTablet
      ? tabletStyles
      : desktopStyles;

  const questions = [
    {
      id: 1,
      question:
        'What is the correct syntax to output "Hello, World" in Python?',
      options: [
        'print "Hello, World"',
        'echo("Hello, World")',
        'print("Hello, World")',
        'System.out.print("Hello, World")',
      ],
    },
    {
      id: 2,
      question: "Which of the following is a valid variable name in Python?",
      options: ["2name", "my-name", "my_name", "my name"],
    },
    {
      id: 3,
      question: "What data type is the result of: type(5.0)?",
      options: ["int", "str", "float", "bool"],
    },
    {
      id: 4,
      question:
        "Which of the following is used to get input from the user in Python?",
      options: ["input()", "get()", "scan()", "prompt()"],
    },
    {
      id: 5,
      question: "What will the following code output?",
      code: `x = 3\ny = 2\nprint(x + y)`,
      options: ["32", "3 + 2", "5", "None"],
    },
    {
      id: 6,
      question: "Which of the following is a Python keyword?",
      options: ["function", "def", "func", "define"],
    },
    {
      id: 7,
      question: "What is the output of: len('Python')?",
      options: ["5", "6", "7", "Error"],
    },
    {
      id: 8,
      question: "Which method is used to add an item to a list?",
      options: ["add()", "append()", "push()", "insert()"],
    },
    {
      id: 9,
      question: "What does the '//' operator do in Python?",
      options: ["Division", "Floor division", "Modulo", "Exponent"],
    },
    {
      id: 10,
      question: "Which of these is a valid dictionary?",
      code: `Choose the correct syntax`,
      options: [
        "{1: 'one', 2: 'two'}",
        "[1: 'one', 2: 'two']",
        "(1: 'one', 2: 'two')",
        "<1: 'one', 2: 'two'>",
      ],
    },
  ];

  const totalQuestions = questions.length;
  const questionsPerPage = isMobile ? 1 : isTablet ? 2 : 3;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);

  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = questions.slice(startIndex, endIndex);

  const answeredCount = 3; // This would come from state in real app

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {!isMobile && <TopNav activeNav={"My Courses"} />}
      <View style={!isMobile && styles.spacer} />

      {/* Quiz Header */}
      <View style={styles.quizHeader}>
        <View style={styles.quizHeaderLeft}>
          <TouchableOpacity style={styles.backBtn}>
            <Ionicons
              name="arrow-back"
              size={isMobile ? 20 : 22}
              color="#ff7a00"
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.quizTitle}>Python Basics Quiz</Text>
            <Text style={styles.quizMeta}>
              Module 1 · {totalQuestions} Questions · 20 minutes · 20 points
            </Text>
          </View>
        </View>

        {!isMobile && (
          <View style={styles.quizStats}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.statText}>15:24 remaining</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
              <Text style={styles.statText}>
                {answeredCount}/{totalQuestions} answered
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Quiz Progress</Text>
          <Text style={styles.progressPercentage}>
            {Math.round((currentPage / totalPages) * 100)}%
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(currentPage / totalPages) * 100}%` },
            ]}
          />
        </View>
        <View style={styles.progressSteps}>
          <Text style={styles.progressStep}>
            Question {startIndex + 1}-{Math.min(endIndex, totalQuestions)}
          </Text>
          <Text style={styles.progressStep}>
            Page {currentPage} of {totalPages}
          </Text>
        </View>
      </View>

      {/* Mobile Stats */}
      {isMobile && (
        <View style={styles.mobileStats}>
          <View style={styles.mobileStatItem}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.mobileStatText}>15:24 left</Text>
          </View>
          <View style={styles.mobileStatDivider} />
          <View style={styles.mobileStatItem}>
            <Ionicons name="checkmark-circle" size={14} color="#22c55e" />
            <Text style={styles.mobileStatText}>
              {answeredCount}/{totalQuestions}
            </Text>
          </View>
        </View>
      )}

      {/* Main ScrollView */}
      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={styles.mainScrollContent}
        showsVerticalScrollIndicator={true}
      >
        {/* Questions Grid */}
        <View style={styles.questionsGrid}>
          {currentQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              number={question.id}
              question={question.question}
              options={question.options}
              code={question.code}
              totalQuestions={totalQuestions}
            />
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          {/* Pagination */}
          <View style={styles.pagination}>
            <TouchableOpacity
              style={[
                styles.pageBtn,
                currentPage === 1 && styles.pageBtnDisabled,
              ]}
              disabled={currentPage === 1}
              onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              <Ionicons
                name="chevron-back"
                size={18}
                color={currentPage === 1 ? "#ccc" : "#666"}
              />
            </TouchableOpacity>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <TouchableOpacity
                key={page}
                style={[styles.page, currentPage === page && styles.pageActive]}
                onPress={() => setCurrentPage(page)}
              >
                <Text
                  style={[
                    styles.pageText,
                    currentPage === page && styles.pageTextActive,
                  ]}
                >
                  {page}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[
                styles.pageBtn,
                currentPage === totalPages && styles.pageBtnDisabled,
              ]}
              disabled={currentPage === totalPages}
              onPress={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
            >
              <Ionicons
                name="chevron-forward"
                size={18}
                color={currentPage === totalPages ? "#ccc" : "#666"}
              />
            </TouchableOpacity>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.draftBtn}>
              <Ionicons name="save-outline" size={18} color="#666" />
              <Text style={styles.draftText}>Save Draft</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitBtn}>
              <Text style={styles.submitText}>Submit Quiz</Text>
              <Ionicons name="checkmark" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quiz Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#ff7a00"
            />
            <Text style={styles.infoTitle}>Quiz Instructions</Text>
          </View>
          <Text style={styles.infoText}>
            • You have 20 minutes to complete this quiz{"\n"}• Each question is
            worth 2 points{"\n"}• You can flag questions for review{"\n"}• Your
            progress is automatically saved
          </Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {isMobile && <StudentBottomNav />}
    </SafeAreaView>
  );
}

// DESKTOP STYLES (≥ 1024px)
const desktopStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  spacer: {
    height: 70,
  },
  quizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 90,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  quizHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  quizMeta: {
    fontSize: 13,
    color: "#666",
  },
  quizStats: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 30,
    gap: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: "#e0e0e0",
  },
  progressSection: {
    paddingHorizontal: 90,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ff7a00",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#ff7a00",
    borderRadius: 3,
  },
  progressSteps: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressStep: {
    fontSize: 12,
    color: "#999",
  },
  mainScroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainScrollContent: {
    paddingHorizontal: 90,
    paddingVertical: 30,
  },
  questionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    marginBottom: 30,
  },
  questionCard: {
    width: "31.5%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  questionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  questionNumber: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ff7a00",
  },
  questionMeta: {
    fontSize: 11,
    color: "#999",
  },
  pointsBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF9E6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointsText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#B76E00",
  },
  questionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 16,
    lineHeight: 20,
  },
  codeBlock: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  codeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  codeHeaderText: {
    fontSize: 11,
    color: "#666",
    fontWeight: "500",
  },
  codeText: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#333",
    lineHeight: 18,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  radioSelected: {
    borderColor: "#ff7a00",
    backgroundColor: "#ff7a00",
  },
  optionText: {
    fontSize: 13,
    color: "#666",
    flex: 1,
  },
  optionTextSelected: {
    color: "#ff7a00",
    fontWeight: "500",
  },
  questionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  flagBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  flagText: {
    fontSize: 11,
    color: "#666",
  },
  questionStatus: {
    fontSize: 11,
    color: "#22c55e",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pageBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  pageBtnDisabled: {
    opacity: 0.5,
  },
  page: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  pageActive: {
    backgroundColor: "#ff7a00",
  },
  pageText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666",
  },
  pageTextActive: {
    color: "#fff",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  draftBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#f8f9fa",
  },
  draftText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#ff7a00",
  },
  submitText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
  },
  infoCard: {
    backgroundColor: "#F8FAFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  infoText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 40,
  },
  mobileStats: {
    display: "none",
  },
});

// TABLET STYLES (768px - 1023px)
const tabletStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  spacer: {
    height: 70,
  },
  quizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  quizHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  quizMeta: {
    fontSize: 12,
    color: "#666",
  },
  quizStats: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 10,
    borderRadius: 25,
    gap: 12,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 18,
    backgroundColor: "#e0e0e0",
  },
  progressSection: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666",
  },
  progressPercentage: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ff7a00",
  },
  progressBar: {
    height: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 2.5,
    overflow: "hidden",
    marginBottom: 6,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#ff7a00",
    borderRadius: 2.5,
  },
  progressSteps: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressStep: {
    fontSize: 11,
    color: "#999",
  },
  mainScroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainScrollContent: {
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  questionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
  },
  questionCard: {
    width: "48.5%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  questionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  questionNumber: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ff7a00",
  },
  questionMeta: {
    fontSize: 10,
    color: "#999",
  },
  pointsBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF9E6",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },
  pointsText: {
    fontSize: 9,
    fontWeight: "600",
    color: "#B76E00",
  },
  questionText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
    marginBottom: 14,
    lineHeight: 18,
  },
  codeBlock: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  codeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  codeHeaderText: {
    fontSize: 10,
    color: "#666",
    fontWeight: "500",
  },
  codeText: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#333",
    lineHeight: 16,
  },
  optionsContainer: {
    gap: 10,
    marginBottom: 14,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  radioSelected: {
    borderColor: "#ff7a00",
    backgroundColor: "#ff7a00",
  },
  optionText: {
    fontSize: 12,
    color: "#666",
    flex: 1,
  },
  optionTextSelected: {
    color: "#ff7a00",
    fontWeight: "500",
  },
  questionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  flagBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  flagText: {
    fontSize: 10,
    color: "#666",
  },
  questionStatus: {
    fontSize: 10,
    color: "#22c55e",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  pageBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  pageBtnDisabled: {
    opacity: 0.5,
  },
  page: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  pageActive: {
    backgroundColor: "#ff7a00",
  },
  pageText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
  },
  pageTextActive: {
    color: "#fff",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  draftBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
  },
  draftText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#ff7a00",
  },
  submitText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  infoCard: {
    backgroundColor: "#F8FAFF",
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
  },
  infoText: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
  },
  bottomSpacer: {
    height: 40,
  },
  mobileStats: {
    display: "none",
  },
});

// MOBILE STYLES (< 768px)
const mobileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  quizHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  quizHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  quizTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  quizMeta: {
    fontSize: 11,
    color: "#666",
  },
  progressSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ff7a00",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 4,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#ff7a00",
    borderRadius: 2,
  },
  progressSteps: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressStep: {
    fontSize: 10,
    color: "#999",
  },
  mobileStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f8f9fa",
    gap: 16,
  },
  mobileStatItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  mobileStatText: {
    fontSize: 11,
    color: "#666",
    fontWeight: "500",
  },
  mobileStatDivider: {
    width: 1,
    height: 12,
    backgroundColor: "#e0e0e0",
  },
  mainScroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 80,
  },
  questionsGrid: {
    gap: 12,
    marginBottom: 20,
  },
  questionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  questionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  questionNumber: {
    fontSize: 11,
    fontWeight: "600",
    color: "#ff7a00",
  },
  questionMeta: {
    fontSize: 9,
    color: "#999",
  },
  pointsBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF9E6",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  pointsText: {
    fontSize: 8,
    fontWeight: "600",
    color: "#B76E00",
  },
  questionText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000",
    marginBottom: 12,
    lineHeight: 16,
  },
  codeBlock: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  codeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  codeHeaderText: {
    fontSize: 9,
    color: "#666",
    fontWeight: "500",
  },
  codeText: {
    fontFamily: "monospace",
    fontSize: 10,
    color: "#333",
    lineHeight: 14,
  },
  optionsContainer: {
    gap: 8,
    marginBottom: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
  },
  radio: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  radioSelected: {
    borderColor: "#ff7a00",
    backgroundColor: "#ff7a00",
  },
  optionText: {
    fontSize: 11,
    color: "#666",
    flex: 1,
  },
  optionTextSelected: {
    color: "#ff7a00",
    fontWeight: "500",
  },
  questionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  flagBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  flagText: {
    fontSize: 9,
    color: "#666",
  },
  questionStatus: {
    fontSize: 9,
    color: "#22c55e",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  pageBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  pageBtnDisabled: {
    opacity: 0.5,
  },
  page: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },
  pageActive: {
    backgroundColor: "#ff7a00",
  },
  pageText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#666",
  },
  pageTextActive: {
    color: "#fff",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  draftBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
  },
  draftText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#666",
  },
  submitBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#ff7a00",
  },
  submitText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#fff",
  },
  infoCard: {
    backgroundColor: "#F8FAFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },
  infoText: {
    fontSize: 11,
    color: "#666",
    lineHeight: 16,
  },
  bottomSpacer: {
    height: 80,
  },
});
