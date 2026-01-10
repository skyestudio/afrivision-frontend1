import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import InsTopNav from "../../components/InsTopNav";

const STEPS = [
  {
    id: 1,
    title: "Basic Information",
    subtitle: "Course title, description, category",
  },
  {
    id: 2,
    title: "Curriculum Builder",
    subtitle: "Modules, lessons, resources",
  },
  {
    id: 3,
    title: "Pricing & Access",
    subtitle: "Set price, enrollment options",
  },
  {
    id: 4,
    title: "Publish Settings",
    subtitle: "Final review and visibility",
  },
];

// Step 1: Basic Information
function BasicInfoStep() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Basic Information</Text>
      <Text style={styles.subtitle}>
        Add the course title, description, category, and a thumbnail to
        introduce your course.
      </Text>

      <View style={styles.rowLayout}>
        <View style={styles.column}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Course Title</Text>
            <TextInput placeholder="Enter course title" style={styles.input} />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Short Description</Text>
            <TextInput
              placeholder="Brief course description"
              multiline
              numberOfLines={3}
              style={[styles.input, styles.textarea]}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Category</Text>
            <TextInput placeholder="Select category" style={styles.input} />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Level</Text>
            <TextInput
              placeholder="Beginner / Intermediate / Advanced"
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.column}>
          <TouchableOpacity style={styles.uploadBox}>
            <Feather name="upload" size={24} color="#6b7280" />
            <Text style={styles.uploadText}>Thumbnail Upload</Text>
            <Text style={styles.uploadSubtext}>
              Drag & drop or click to upload
            </Text>
          </TouchableOpacity>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Estimated Duration</Text>
            <TextInput placeholder="e.g. 6 hours" style={styles.input} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// Module/Lesson/Quiz Components
function ModuleItem({ title, lessons = [], onAddLesson, onAddQuiz }) {
  return (
    <View style={styles.moduleCard}>
      <View style={styles.moduleHeader}>
        <Text style={styles.moduleTitle}>{title}</Text>
        <View style={styles.moduleActions}>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="edit" size={16} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="trash" size={16} color="#ef4444" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="chevron-down" size={16} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      {lessons.map((lesson, index) => (
        <View key={index} style={styles.lessonItem}>
          <View style={styles.lessonIcon}>
            <Feather
              name={lesson.type === "video" ? "play-circle" : "file-text"}
              size={16}
              color="#6b7280"
            />
          </View>
          <View style={styles.lessonContent}>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonMeta}>
              {lesson.type === "video" ? "Video" : "Quiz"} • {lesson.duration}
            </Text>
          </View>
          <TouchableOpacity style={styles.lessonActions}>
            <Feather name="more-vertical" size={16} color="#6b7280" />
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.moduleFooter}>
        <TouchableOpacity style={styles.addItemBtn} onPress={onAddLesson}>
          <Feather name="plus" size={16} color="#000" />
          <Text style={styles.addItemText}>Add Lesson</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addItemBtn} onPress={onAddQuiz}>
          <Feather name="plus" size={16} color="#000" />
          <Text style={styles.addItemText}>Add Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Step 2: Curriculum Builder
function CurriculumBuilderStep({
  setShowLessonModal,
  setShowQuizModal,
  onAddModule,
}) {
  const [modules, setModules] = useState([
    {
      title: "Module 1: Getting Started",
      lessons: [
        {
          title: "Lesson 1: Introduction to Course",
          type: "video",
          duration: "5 min",
        },
        {
          title: "Quiz 1: Lesson 1 Assessment",
          type: "quiz",
          duration: "10 min",
        },
      ],
    },
  ]);

  const handleAddModule = () => {
    const newModuleNumber = modules.length + 1;
    setModules([
      ...modules,
      {
        title: `Module ${newModuleNumber}: New Module`,
        lessons: [],
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Curriculum Builder</Text>
      <Text style={styles.subtitle}>
        Structure your course by creating modules, lessons, and quizzes.
      </Text>

      <ScrollView
        style={styles.curriculumScroll}
        showsVerticalScrollIndicator={true}>
        <View style={styles.previewSection}>
          <Text style={styles.sectionTitle}>Preview</Text>

          <TouchableOpacity
            style={styles.addModuleBtn}
            onPress={handleAddModule}>
            <Feather name="plus" size={20} color="#000" />
            <Text style={styles.addModuleText}>Add Module</Text>
          </TouchableOpacity>

          {modules.map((module, index) => (
            <ModuleItem
              key={index}
              title={module.title}
              lessons={module.lessons}
              onAddLesson={() => setShowLessonModal(true)}
              onAddQuiz={() => setShowQuizModal(true)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// Modals for Lesson/Quiz Creation
function LessonModal({ visible, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [contentType, setContentType] = useState("video");

  const handleSave = () => {
    if (title.trim() && duration.trim()) {
      onSave({ title, description, duration, contentType });
      setTitle("");
      setDescription("");
      setDuration("");
      setContentType("video");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Lesson</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Lesson Title</Text>
              <TextInput
                placeholder="Enter lesson title"
                style={styles.input}
                value={title}
                onChangeText={setTitle}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                placeholder="Lesson description (optional)"
                multiline
                numberOfLines={3}
                style={[styles.input, styles.textarea]}
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Duration</Text>
              <TextInput
                placeholder="e.g. 15 min"
                style={styles.input}
                value={duration}
                onChangeText={setDuration}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Content Type</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setContentType("video")}>
                  <View
                    style={[
                      styles.radioCircle,
                      contentType === "video" && styles.radioCircleActive,
                    ]}>
                    {contentType === "video" && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <Text style={styles.radioText}>Video</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setContentType("document")}>
                  <View
                    style={[
                      styles.radioCircle,
                      contentType === "document" && styles.radioCircleActive,
                    ]}>
                    {contentType === "document" && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <Text style={styles.radioText}>Document</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.uploadContentBtn}>
              <Feather name="upload" size={20} color="#f97316" />
              <Text style={styles.uploadContentText}>Upload Content</Text>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.doneBtn,
                !title.trim() || (!duration.trim() && styles.disabledBtn),
              ]}
              onPress={handleSave}
              disabled={!title.trim() || !duration.trim()}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function QuizModal({ visible, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [quizType, setQuizType] = useState("multiple-choice");

  const handleSave = () => {
    if (title.trim() && duration.trim()) {
      onSave({ title, description, duration, quizType });
      setTitle("");
      setDescription("");
      setDuration("");
      setQuizType("multiple-choice");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Quiz</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Quiz Title</Text>
              <TextInput
                placeholder="Enter quiz title"
                style={styles.input}
                value={title}
                onChangeText={setTitle}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                placeholder="Quiz description (optional)"
                multiline
                numberOfLines={3}
                style={[styles.input, styles.textarea]}
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Duration</Text>
              <TextInput
                placeholder="e.g. 30 min"
                style={styles.input}
                value={duration}
                onChangeText={setDuration}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Quiz Type</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setQuizType("multiple-choice")}>
                  <View
                    style={[
                      styles.radioCircle,
                      quizType === "multiple-choice" &&
                        styles.radioCircleActive,
                    ]}>
                    {quizType === "multiple-choice" && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <Text style={styles.radioText}>Multiple Choice</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setQuizType("true-false")}>
                  <View
                    style={[
                      styles.radioCircle,
                      quizType === "true-false" && styles.radioCircleActive,
                    ]}>
                    {quizType === "true-false" && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <Text style={styles.radioText}>True/False</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.addQuestionBtn}>
              <Feather name="plus" size={20} color="#f97316" />
              <Text style={styles.addQuestionText}>Add Question</Text>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.doneBtn,
                !title.trim() || (!duration.trim() && styles.disabledBtn),
              ]}
              onPress={handleSave}
              disabled={!title.trim() || !duration.trim()}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// Step 3: Pricing & Access
function PricingStep() {
  const [accessType, setAccessType] = useState("free");
  const [price, setPrice] = useState("");

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Pricing & Access</Text>
      <Text style={styles.subtitle}>
        Set course access (free or paid), price, and optional discount codes.
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Course Access Type</Text>
        <View style={styles.accessTypeGroup}>
          <TouchableOpacity
            style={[
              styles.accessTypeOption,
              accessType === "free" && styles.accessTypeActive,
            ]}
            onPress={() => setAccessType("free")}>
            <Text
              style={[
                styles.accessTypeText,
                accessType === "free" && styles.accessTypeTextActive,
              ]}>
              Free
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.accessTypeOption,
              accessType === "paid" && styles.accessTypeActive,
            ]}
            onPress={() => setAccessType("paid")}>
            <Text
              style={[
                styles.accessTypeText,
                accessType === "paid" && styles.accessTypeTextActive,
              ]}>
              Paid
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {accessType === "paid" && (
        <>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Currency</Text>
            <TextInput
              placeholder="USD"
              style={styles.input}
              value="USD"
              editable={false}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              placeholder="0.00"
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
            />
          </View>

          <TouchableOpacity style={styles.addDiscountBtn}>
            <Feather name="tag" size={16} color="#f97316" />
            <Text style={styles.addDiscountText}>Add Discount Code</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

// Step 4: Publish Settings
function PublishStep() {
  const [visibility, setVisibility] = useState("draft");

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Publish Settings</Text>
      <Text style={styles.subtitle}>
        Finalize your course details and choose visibility settings before
        publishing.
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Course Visibility</Text>
        <View style={styles.visibilityGroup}>
          <TouchableOpacity
            style={[
              styles.visibilityOption,
              visibility === "draft" && styles.visibilityActive,
            ]}
            onPress={() => setVisibility("draft")}>
            <Feather
              name="edit"
              size={16}
              color={visibility === "draft" ? "#fff" : "#6b7280"}
            />
            <Text
              style={[
                styles.visibilityText,
                visibility === "draft" && styles.visibilityTextActive,
              ]}>
              Draft
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.visibilityOption,
              visibility === "published" && styles.visibilityActive,
            ]}
            onPress={() => setVisibility("published")}>
            <Feather
              name="globe"
              size={16}
              color={visibility === "published" ? "#fff" : "#6b7280"}
            />
            <Text
              style={[
                styles.visibilityText,
                visibility === "published" && styles.visibilityTextActive,
              ]}>
              Published
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.visibilityOption,
              visibility === "private" && styles.visibilityActive,
            ]}
            onPress={() => setVisibility("private")}>
            <Feather
              name="lock"
              size={16}
              color={visibility === "private" ? "#fff" : "#6b7280"}
            />
            <Text
              style={[
                styles.visibilityText,
                visibility === "private" && styles.visibilityTextActive,
              ]}>
              Private
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.publishSummary}>
        <Text style={styles.summaryTitle}>Ready to publish!</Text>
        <Text style={styles.summaryText}>
          Review all details before publishing. Once published, your course will
          be available to students.
        </Text>
      </View>
    </ScrollView>
  );
}

// Sidebar Component
function StepSidebar({ activeStep, setActiveStep }) {
  return (
    <View style={styles.sidebar}>
      <Text style={styles.stepHeader}>STEP {activeStep}</Text>

      {STEPS.map((step) => (
        <TouchableOpacity
          key={step.id}
          style={[styles.stepItem, activeStep === step.id && styles.stepActive]}
          onPress={() => setActiveStep(step.id)}>
          <View
            style={[
              styles.stepDot,
              activeStep >= step.id && styles.stepDotActive,
            ]}
          />
          <View style={styles.stepContent}>
            <Text
              style={[
                styles.stepTitle,
                activeStep === step.id && styles.stepTitleActive,
              ]}>
              {step.title}
            </Text>
            <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// Footer Buttons
function FooterButtons({ activeStep, setActiveStep }) {
  const isLastStep = activeStep === STEPS.length;

  const handleContinue = () => {
    if (isLastStep) {
      // Handle publish action
      console.log("Publishing course...");
    } else {
      setActiveStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.draftBtn}>
        <Text style={styles.draftText}>Save as Draft</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueText}>
          {isLastStep ? "Publish Now" : "Continue"}
        </Text>
        {!isLastStep && <Feather name="arrow-right" size={16} color="#fff" />}
      </TouchableOpacity>
    </View>
  );
}

// Main Component
export default function CreateCourseScreen() {
  const [activeStep, setActiveStep] = useState(1);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  const handleSaveLesson = (lesson) => {
    console.log("Lesson saved:", lesson);
    setShowLessonModal(false);
  };

  const handleSaveQuiz = (quiz) => {
    console.log("Quiz saved:", quiz);
    setShowQuizModal(false);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return <BasicInfoStep />;
      case 2:
        return (
          <CurriculumBuilderStep
            setShowLessonModal={setShowLessonModal}
            setShowQuizModal={setShowQuizModal}
          />
        );
      case 3:
        return <PricingStep />;
      case 4:
        return <PublishStep />;
      default:
        return <BasicInfoStep />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <InsTopNav activeNav={"Dashboard"} />
      <View style={{ width: "100%", height: 70 }}></View>

      <View style={styles.layout}>
        {/* LEFT: Steps Sidebar */}
        <StepSidebar activeStep={activeStep} setActiveStep={setActiveStep} />

        {/* RIGHT: Content */}
        <View style={styles.content}>
          {renderStepContent()}

          {/* Footer Buttons */}
          <FooterButtons
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </View>
      </View>

      {/* Modals */}
      <LessonModal
        visible={showLessonModal}
        onClose={() => setShowLessonModal(false)}
        onSave={handleSaveLesson}
      />

      <QuizModal
        visible={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        onSave={handleSaveQuiz}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  layout: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    gap: 24,
    paddingVertical: 20,
  },
  sidebar: {
    width: 260,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderColor: "#e5e7eb",
    height: "100%",
  },
  stepHeader: {
    fontWeight: "700",
    color: "#6b7280",
    fontSize: 12,
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  stepItem: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 12,
    alignItems: "flex-start",
  },
  stepActive: {
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginHorizontal: -8,
  },
  stepContent: {
    flex: 1,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#d1d5db",
    marginTop: 6,
  },
  stepDotActive: {
    backgroundColor: "#f97316",
  },
  stepTitle: {
    fontWeight: "600",
    color: "#374151",
    fontSize: 14,
    marginBottom: 2,
  },
  stepTitleActive: {
    color: "#111827",
  },
  stepSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 16,
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    borderColor: "#e5e7eb",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 24,
    lineHeight: 20,
  },
  rowLayout: {
    flexDirection: "row",
    gap: 24,
  },
  column: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#fff",
    fontSize: 14,
  },
  textarea: {
    height: 80,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  uploadBox: {
    height: 200,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#d1d5db",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 20,
    marginBottom: 10,
  },
  uploadText: {
    color: "#111827",
    fontWeight: "600",
    fontSize: 14,
  },
  uploadSubtext: {
    color: "#6b7280",
    fontSize: 12,
  },
  curriculumScroll: {
    //flex: 1,
    height: 1,
    // backgroundColor: "red",
    width: "100%",
  },
  previewSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  moduleCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
  },
  moduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  moduleTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  moduleActions: {
    flexDirection: "row",
    gap: 12,
  },
  iconBtn: {
    padding: 4,
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  lessonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 2,
  },
  lessonMeta: {
    fontSize: 11,
    color: "#9ca3af",
  },
  lessonActions: {
    padding: 4,
  },
  moduleFooter: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    justifyContent: "space-evenly",
  },
  addItemBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  addItemText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000",
  },
  addModuleBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "whitesmoke",
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
    marginVertical: 10,
    width: "30%",
  },
  addModuleText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 14,
  },
  accessTypeGroup: {
    flexDirection: "row",
    gap: 12,
  },
  accessTypeOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  accessTypeActive: {
    backgroundColor: "#f97316",
    borderColor: "#f97316",
  },
  accessTypeText: {
    fontWeight: "600",
    color: "#374151",
  },
  accessTypeTextActive: {
    color: "#fff",
  },
  addDiscountBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f97316",
    alignSelf: "flex-start",
  },
  addDiscountText: {
    color: "#f97316",
    fontWeight: "600",
    fontSize: 14,
  },
  visibilityGroup: {
    flexDirection: "row",
    gap: 12,
  },
  visibilityOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    justifyContent: "center",
  },
  visibilityActive: {
    backgroundColor: "#f97316",
    borderColor: "#f97316",
  },
  visibilityText: {
    fontWeight: "600",
    color: "#374151",
  },
  visibilityTextActive: {
    color: "#fff",
  },
  publishSummary: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
    width: "60%",
    alignSelf: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  modalBody: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  modalFooter: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  cancelText: {
    fontWeight: "600",
    color: "#374151",
  },
  doneBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#f97316",
  },
  disabledBtn: {
    backgroundColor: "#ccc",
    opacity: 0.6,
  },
  doneText: {
    fontWeight: "600",
    color: "#fff",
  },
  radioGroup: {
    gap: 16,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#d1d5db",
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircleActive: {
    borderColor: "#f97316",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#f97316",
  },
  radioText: {
    fontSize: 14,
    color: "#374151",
  },
  uploadContentBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f97316",
    justifyContent: "center",
    marginTop: 8,
  },
  uploadContentText: {
    color: "#f97316",
    fontWeight: "600",
    fontSize: 14,
  },
  addQuestionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f97316",
    justifyContent: "center",
    marginTop: 8,
  },
  addQuestionText: {
    color: "#f97316",
    fontWeight: "600",
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    //  backgroundColor: "red",
  },
  draftBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
  },
  draftText: {
    fontWeight: "600",
    color: "#374151",
    fontSize: 14,
  },
  continueBtn: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#f97316",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
