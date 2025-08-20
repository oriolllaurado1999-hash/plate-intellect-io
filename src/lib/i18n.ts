export interface Translations {
  // Navigation
  home: string;
  progress: string;
  settings: string;
  profile: string;
  goals: string;
  activity: string;

  // Dashboard
  dailyCalories: string;
  caloriesConsumed: string;
  remaining: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snack: string;
  water: string;
  glassesOfWater: string;
  macros: string;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
  totalCalories: string;
  thisWeek: string;
  dailyAvg: string;
  perDay: string;
  todaysMacros: string;
  proteinLeft: string;
  carbsLeft: string;
  fatLeft: string;
  
  // Recently uploaded
  recentlyUploaded: string;
  noRecentMeals: string;
  startScanning: string;
  tapToAddFirstMeal: string;

  // Kalore Coach
  kaloreCoach: string;
  yourPersonalizedVirtualTrainer: string;
  virtualTrainerReady: string;
  welcomeMessage: string;
  quickQuestions: string[];
  quickQuestionsLabel: string;
  placeholder: string;
  error: string;
  errorDescription: string;
  errorMessage: string;

  // Profile
  accountInformation: string;
  inviteFriends: string;
  journeyEasierTogether: string;
  earnForEachFriend: string;
  shareInviteLink: string;
  personalDetails: string;
  editNutritionGoals: string;
  goalsCurrentWeight: string;
  weightHistory: string;
  language: string;
  preferences: string;
  appearance: string;
  chooseAppearance: string;
  light: string;
  dark: string;
  system: string;
  liveActivity: string;
  liveActivityDesc: string;
  addBurnedCalories: string;
  addBurnedCaloriesDesc: string;
  rolloverCalories: string;
  rolloverCaloriesDesc: string;
  autoAdjustMacros: string;
  autoAdjustMacrosDesc: string;
  widgets: string;
  howToAdd: string;
  widgetConfigSoon: string;
  termsConditions: string;
  privacyPolicy: string;
  supportEmail: string;
  syncData: string;
  lastSynced: string;
  deleteAccount: string;
  logout: string;
  comingSoon: string;

  // Common
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  done: string;
  close: string;
  selectLanguage: string;
  calories: string;
  gram: string;
  grams: string;
  ml: string;
  
  // Time
  today: string;
  yesterday: string;
  thisMonth: string;
  
  // Food
  confidence: string;
  healthScore: string;
  servings: string;
  mealType: string;
  foodItems: string;
  addFoodItem: string;
  
  // Dashboard Cards
  caloriesLeft: string;
  stepsToday: string;
  fiberLeft: string;
  sugarLeft: string;
  sodiumLeft: string;
  
  // Feedback messages
  feedbackQuestion: string;
  accurate: string;
  needsWork: string;
  feedbackThankYou: string;
  feedbackExplanation: string;
  
  // Days of the week (abbreviated)
  daysShort: string[];
  
  // Buttons
  scanFood: string;
  addManually: string;
  voiceInput: string;
  
  // Notifications
  mealSaved: string;
  errorSavingMeal: string;
  
  // Barcode Scanner
  barcodeScanner: string;
  analyzing: string;
  keepBarcodeVisible: string;
  barcodeDetected: string;
  positionBarcodeInFrame: string;

  // Weight History Modal
  trendView: string;
  average: string;
  vsPriorMonth: string;
  weightThisWeek: string;
  weightThisMonth: string;
  weightThisPeriod: string;
  weightWeek: string;
  weightMonth: string;
  weightPeriod: string;
  weightAverageDescription: string;
  lastUpdated: string;
  addManualMeasurement: string;
  seeAllRecordings: string;
  addWeightMeasurement: string;
  weightKg: string;
  enterYourWeight: string;
  weightMeasurementNote: string;
  allRecordings: string;
  
  // Auth page
  calorieTracking: string;
  madeEasy: string;
  getStarted: string;
  alreadyHaveAccount: string;
  signIn: string;
  createAccount: string;
  welcomeBack: string;
  continueWithGoogle: string;
  or: string;
  email: string;
  password: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  dontHaveAccount: string;
  signUp: string;
  fillAllFields: string;
  accountCreatedSuccess: string;
  termsPrivacy: string;
  
  // Onboarding
  continue: string;
  chooseYourGender: string;
  genderDescription: string;
  male: string;
  female: string;
  
  // Welcome Dashboard
  thankYouForYourTime: string;
  welcomeToPersonalizedDashboard: string;
  preparingYourExperience: string;
  continueToDashboard: string;
}

export const translations: Record<string, Translations> = {
  en: {
    // Navigation
    home: "Home",
    progress: "Progress", 
    settings: "Settings",
    profile: "Profile",
    goals: "Goals",
    activity: "Activity",

    // Dashboard
    dailyCalories: "Daily Calories",
    caloriesConsumed: "Calories Consumed",
    remaining: "Remaining",
    breakfast: "Breakfast",
    lunch: "Lunch", 
    dinner: "Dinner",
    snack: "Snack",
    water: "Water",
    glassesOfWater: "glasses of water",
    macros: "Macros",
    protein: "Protein",
    carbs: "Carbs",
    fat: "Fat",
    fiber: "Fiber",
    totalCalories: "Total Calories",
    thisWeek: "This Week",
    dailyAvg: "Daily Avg",
    perDay: "Per Day",
    todaysMacros: "Today's Macros",
    proteinLeft: "Protein left",
    carbsLeft: "Carbs left",
    fatLeft: "Fat left",

    // Recently uploaded
    recentlyUploaded: "Recently uploaded",
    noRecentMeals: "No recent meals found",
    startScanning: "Start scanning your food!",
    tapToAddFirstMeal: "Tap + to add your first meal of the day",

    // Kalore Coach
    kaloreCoach: "Kalore Coach",
    yourPersonalizedVirtualTrainer: "Your personalized virtual trainer",
    virtualTrainerReady: "Your virtual trainer is ready to help you",
    welcomeMessage: "Hello! 👋 I'm your virtual trainer Kalore Coach. I'm here to help you with your nutritional goals. How can I help you today?",
    quickQuestions: [
      "What should I eat now?",
      "How am I doing with my goals today?", 
      "Dinner suggestions",
      "Do I need more protein?"
    ],
    quickQuestionsLabel: "Quick questions:",
    placeholder: "Type your question...",
    error: "Error",
    errorDescription: "I couldn't process your message. Please try again.",
    errorMessage: "Sorry, there was a problem processing your message. Could you try again? 😔",

    // Profile
    accountInformation: "Account Information",
    inviteFriends: "Invite Friends",
    journeyEasierTogether: "The journey is easier together",
    earnForEachFriend: "Earn $10 for each friend referred",
    shareInviteLink: "Share Invite Link",
    personalDetails: "Personal Details",
    editNutritionGoals: "Edit Nutrition Goals",
    goalsCurrentWeight: "Goals & Current Weight",
    weightHistory: "Weight History",
    language: "Language",
    preferences: "Preferences",
    appearance: "Appearance",
    chooseAppearance: "Choose light, dark, or system appearance",
    light: "Light",
    dark: "Dark",
    system: "System",
    liveActivity: "Live Activity",
    liveActivityDesc: "Show your daily calories and macros on your lock screen and dynamic island",
    addBurnedCalories: "Add Burned Calories",
    addBurnedCaloriesDesc: "Add burned calories back to daily goal",
    rolloverCalories: "Rollover Calories",
    rolloverCaloriesDesc: "Add up to 200 left over calories from yesterday into today's daily goal",
    autoAdjustMacros: "Auto Adjust Macros",
    autoAdjustMacrosDesc: "When editing calories or macronutrients, automatically adjust the other values proportionally",
    widgets: "Widgets",
    howToAdd: "How to add?",
    widgetConfigSoon: "Widget configuration coming soon",
    termsConditions: "Terms and Conditions",
    privacyPolicy: "Privacy Policy",
    supportEmail: "Support Email",
    syncData: "Sync Data",
    lastSynced: "Last Synced",
    deleteAccount: "Delete Account",
    logout: "Logout",
    comingSoon: "Coming Soon",

    // Common
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    done: "Done",
    close: "Close",
    selectLanguage: "Select Language",
    calories: "calories",
    gram: "g",
    grams: "grams",
    ml: "ml",

    // Time
    today: "Today",
    yesterday: "Yesterday",
    thisMonth: "This Month",

    // Food
    confidence: "Confidence",
    healthScore: "Health Score",
    servings: "Servings",
    mealType: "Meal Type",
    foodItems: "Food Items",
    addFoodItem: "Add Food Item",
    
    // Dashboard Cards
    caloriesLeft: "Calories left",
    stepsToday: "Steps today",
    fiberLeft: "Fiber left",
    sugarLeft: "Sugar left",
    sodiumLeft: "Sodium left",

    // Feedback messages
    feedbackQuestion: "How accurate was this analysis?",
    accurate: "Accurate",
    needsWork: "Needs work",
    feedbackThankYou: "Thank you for your feedback! 🙏",
    feedbackExplanation: "This information will be used as a reference for the AI to analyze future meals more accurately.",
    
    // Days of the week (abbreviated)
    daysShort: ["S", "M", "T", "W", "T", "F", "S"], // Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday

    // Buttons
    scanFood: "Scan Food",
    addManually: "Add Manually",
    voiceInput: "Voice Input",

    // Notifications
    mealSaved: "Meal saved successfully!",
    errorSavingMeal: "Error saving meal",
    
    // Barcode Scanner
    barcodeScanner: "Barcode Scanner",
    analyzing: "Analyzing...",
    keepBarcodeVisible: "Keep the barcode visible for analysis",
    barcodeDetected: "Barcode detected!",
    positionBarcodeInFrame: "Position the barcode within the frame",

    // Weight History Modal
    trendView: "TREND VIEW",
    average: "AVERAGE",
    vsPriorMonth: "vs. prior month",
    weightThisWeek: "THIS WEEK",
    weightThisMonth: "JUL 20 - AUG 18, 25",
    weightThisPeriod: "MAR - AUG 2025",
    weightWeek: "week",
    weightMonth: "month",
    weightPeriod: "period",
    weightAverageDescription: "Your average weight this {period} ({weight} kg) was above your previous 30-day average of 81.0 kg.",
    lastUpdated: "Last updated: Aug 15 2025, 12:33PM",
    addManualMeasurement: "ADD MANUAL MEASUREMENT",
    seeAllRecordings: "SEE ALL RECORDINGS",
    addWeightMeasurement: "Add Weight Measurement",
    weightKg: "Weight (kg)",
    enterYourWeight: "Enter your weight",
    weightMeasurementNote: "Note: You can only add one measurement every 7 days.",
    allRecordings: "All Recordings",
    
    // Auth page
    calorieTracking: "Calorie tracking",
    madeEasy: "made easy",
    getStarted: "Get Started",
    alreadyHaveAccount: "Already have an account?",
    signIn: "Sign In",
    createAccount: "Create Account",
    welcomeBack: "Welcome Back",
    continueWithGoogle: "Continue with Google",
    or: "or",
    email: "Email",
    password: "Password",
    emailPlaceholder: "your@email.com",
    passwordPlaceholder: "••••••••",
    dontHaveAccount: "Don't have an account?",
    signUp: "Sign up",
    fillAllFields: "Please fill in all fields",
    accountCreatedSuccess: "Account created successfully! You can now sign in.",
    termsPrivacy: "By continuing, you agree to our Terms of Service and Privacy Policy",
    
    // Onboarding
    continue: "Continue",
    chooseYourGender: "Choose your Gender",
    genderDescription: "This will be used to calibrate your custom plan.",
    male: "Male",
    female: "Female",
    
    // Welcome Dashboard
    thankYouForYourTime: "Thank you for your time",
    welcomeToPersonalizedDashboard: "Welcome to your personalized dashboard",
    preparingYourExperience: "Preparing your experience...",
    continueToDashboard: "Continue to Dashboard"
  },

  es: {
    // Navigation
    home: "Inicio",
    progress: "Progreso",
    settings: "Configuración",
    profile: "Perfil",
    goals: "Objetivos",
    activity: "Actividad",

    // Dashboard
    dailyCalories: "Calorías Diarias",
    caloriesConsumed: "Calorías Consumidas",
    remaining: "Restantes",
    breakfast: "Desayuno",
    lunch: "Almuerzo",
    dinner: "Cena",
    snack: "Snack",
    water: "Agua",
    glassesOfWater: "vasos de agua",
    macros: "Macros",
    protein: "Proteína",
    carbs: "Carbohidratos",
    fat: "Grasa",
    fiber: "Fibra",
    totalCalories: "Calorías Totales",
    thisWeek: "Esta Semana",
    dailyAvg: "Promedio Diario",
    perDay: "Por día",
    todaysMacros: "Macros de Hoy",
    proteinLeft: "Proteína restante",
    carbsLeft: "Carbohidratos restantes",
    fatLeft: "Grasa restante",

    // Recently uploaded
    recentlyUploaded: "Subido recientemente",
    noRecentMeals: "No se encontraron comidas recientes",
    startScanning: "¡Comienza a escanear tu comida!",
    tapToAddFirstMeal: "Toca + para agregar tu primera comida del día",

    // Kalore Coach
    kaloreCoach: "Kalore Coach",
    yourPersonalizedVirtualTrainer: "Tu entrenador virtual personalizado",
    virtualTrainerReady: "Tu entrenador virtual está listo para ayudarte",
    welcomeMessage: "¡Hola! 👋 Soy tu entrenador virtual Kalore Coach. Estoy aquí para ayudarte con tus objetivos nutricionales. ¿Cómo puedo ayudarte hoy?",
    quickQuestions: [
      "¿Qué debería comer ahora?",
      "¿Cómo voy con mis objetivos hoy?",
      "Sugerencias para la cena",
      "¿Necesito más proteína?"
    ],
    quickQuestionsLabel: "Preguntas rápidas:",
    placeholder: "Escribe tu pregunta...",
    error: "Error",
    errorDescription: "No pude procesar tu mensaje. Por favor intenta de nuevo.",
    errorMessage: "Lo siento, hubo un problema procesando tu mensaje. ¿Podrías intentar de nuevo? 😔",

    // Profile
    accountInformation: "Información de la Cuenta",
    inviteFriends: "Invitar Amigos",
    journeyEasierTogether: "El viaje es más fácil juntos",
    earnForEachFriend: "Gana $10 por cada amigo referido",
    shareInviteLink: "Compartir Enlace de Invitación",
    personalDetails: "Detalles Personales",
    editNutritionGoals: "Editar Objetivos Nutricionales",
    goalsCurrentWeight: "Objetivos y Peso Actual",
    weightHistory: "Historial de Peso",
    language: "Idioma",
    preferences: "Preferencias",
    appearance: "Apariencia",
    chooseAppearance: "Elige apariencia clara, oscura o del sistema",
    light: "Clara",
    dark: "Oscura",
    system: "Sistema",
    liveActivity: "Actividad en Vivo",
    liveActivityDesc: "Muestra tus calorías y macros diarios en tu pantalla de bloqueo e isla dinámica",
    addBurnedCalories: "Agregar Calorías Quemadas",
    addBurnedCaloriesDesc: "Agregar calorías quemadas de vuelta al objetivo diario",
    rolloverCalories: "Transferir Calorías",
    rolloverCaloriesDesc: "Agregar hasta 200 calorías sobrantes de ayer al objetivo de hoy",
    autoAdjustMacros: "Ajustar Macros Automáticamente",
    autoAdjustMacrosDesc: "Al editar calorías o macronutrientes, ajustar automáticamente los otros valores proporcionalmente",
    widgets: "Widgets",
    howToAdd: "¿Cómo agregar?",
    widgetConfigSoon: "Configuración de widgets próximamente",
    termsConditions: "Términos y Condiciones",
    privacyPolicy: "Política de Privacidad",
    supportEmail: "Email de Soporte",
    syncData: "Sincronizar Datos",
    lastSynced: "Última Sincronización",
    deleteAccount: "Eliminar Cuenta",
    logout: "Cerrar Sesión",
    comingSoon: "Próximamente",

    // Common
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    done: "Listo",
    close: "Cerrar",
    selectLanguage: "Seleccionar Idioma",
    calories: "calorías",
    gram: "g",
    grams: "gramos",
    ml: "ml",

    // Time
    today: "Hoy",
    yesterday: "Ayer",
    thisMonth: "Este Mes",

    // Food
    confidence: "Confianza",
    healthScore: "Puntuación de Salud",
    servings: "Porciones",
    mealType: "Tipo de Comida",
    foodItems: "Elementos de Comida",
    addFoodItem: "Agregar Elemento",
    
    // Dashboard Cards
    caloriesLeft: "Calorías restantes",
    stepsToday: "Pasos hoy",
    fiberLeft: "Fibra restante",
    sugarLeft: "Azúcar restante",
    sodiumLeft: "Sodio restante",

    // Feedback messages
    feedbackQuestion: "¿Qué tan preciso fue este análisis?",
    accurate: "Preciso",
    needsWork: "Necesita mejorar",
    feedbackThankYou: "¡Gracias por tu feedback! 🙏",
    feedbackExplanation: "Esta información se utilizará como referencia para que la IA analice más correctamente futuras comidas.",
    
    // Days of the week (abbreviated)
    daysShort: ["D", "L", "M", "M", "J", "V", "S"], // Domingo, Lunes, Martes, Miércoles, Jueves, Viernes, Sábado

    // Buttons
    scanFood: "Escanear Comida",
    addManually: "Agregar Manualmente",
    voiceInput: "Entrada de Voz",

    // Notifications
    mealSaved: "¡Comida guardada exitosamente!",
    errorSavingMeal: "Error al guardar la comida",
    
    // Barcode Scanner
    barcodeScanner: "Escáner de Código de Barras",
    analyzing: "Analizando...",
    keepBarcodeVisible: "Mantén el código de barras visible para analizarlo",
    barcodeDetected: "¡Código de barras detectado!",
    positionBarcodeInFrame: "Posiciona el código de barras dentro del marco",

    // Weight History Modal
    trendView: "VISTA DE TENDENCIA",
    average: "PROMEDIO",
    vsPriorMonth: "vs. mes anterior",
    weightThisWeek: "ESTA SEMANA",
    weightThisMonth: "20 JUL - 18 AGO, 25",
    weightThisPeriod: "MAR - AGO 2025",
    weightWeek: "semana",
    weightMonth: "mes",
    weightPeriod: "período",
    weightAverageDescription: "Tu peso promedio esta {period} ({weight} kg) estuvo por encima de tu promedio de 30 días anterior de 81.0 kg.",
    lastUpdated: "Última actualización: 15 Ago 2025, 12:33PM",
    addManualMeasurement: "AGREGAR MEDICIÓN MANUAL",
    seeAllRecordings: "VER TODOS LOS REGISTROS",
    addWeightMeasurement: "Agregar Medición de Peso",
    weightKg: "Peso (kg)",
    enterYourWeight: "Ingresa tu peso",
    weightMeasurementNote: "Nota: Solo puedes agregar una medición cada 7 días.",
    allRecordings: "Todos los Registros",
    
    // Auth page
    calorieTracking: "Seguimiento de calorías",
    madeEasy: "hecho fácil",
    getStarted: "Comenzar",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    signIn: "Iniciar Sesión",
    createAccount: "Crear Cuenta",
    welcomeBack: "Bienvenido de Nuevo",
    continueWithGoogle: "Continuar con Google",
    or: "o",
    email: "Correo",
    password: "Contraseña",
    emailPlaceholder: "tu@correo.com",
    passwordPlaceholder: "••••••••",
    dontHaveAccount: "¿No tienes una cuenta?",
    signUp: "Registrarse",
    fillAllFields: "Por favor completa todos los campos",
    accountCreatedSuccess: "¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.",
    termsPrivacy: "Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad",
    
    // Onboarding
    continue: "Continuar",
    chooseYourGender: "Elige tu Género",
    genderDescription: "Esto será usado para calibrar tu plan personalizado.",
    male: "Masculino",
    female: "Femenino",
    
    // Welcome Dashboard
    thankYouForYourTime: "Gracias por tu tiempo",
    welcomeToPersonalizedDashboard: "Bienvenido a tu dashboard personalizado",
    preparingYourExperience: "Preparando tu experiencia...",
    continueToDashboard: "Continuar al Dashboard"
  },

  zh: {
    // Navigation
    home: "首页",
    progress: "进展",
    settings: "设置",
    profile: "个人资料",
    goals: "目标",
    activity: "活动",

    // Dashboard
    dailyCalories: "每日卡路里",
    caloriesConsumed: "消耗卡路里",
    remaining: "剩余",
    breakfast: "早餐",
    lunch: "午餐",
    dinner: "晚餐",
    snack: "零食",
    water: "水",
    glassesOfWater: "杯水",
    macros: "宏量营养素",
    protein: "蛋白质",
    carbs: "碳水化合物",
    fat: "脂肪",
    fiber: "纤维",
    totalCalories: "总卡路里",
    thisWeek: "本周",
    dailyAvg: "每日平均",
    perDay: "每天",
    todaysMacros: "今日宏量营养素",
    proteinLeft: "剩余蛋白质",
    carbsLeft: "剩余碳水化合物",
    fatLeft: "剩余脂肪",

    // Recently uploaded
    recentlyUploaded: "最近上传",
    noRecentMeals: "未找到最近的餐食",
    startScanning: "开始扫描你的食物！",
    tapToAddFirstMeal: "点击 + 添加今天的第一餐",

    // Kalore Coach
    kaloreCoach: "Kalore 教练",
    yourPersonalizedVirtualTrainer: "您的个性化虚拟教练",
    virtualTrainerReady: "您的虚拟教练准备好帮助您",
    welcomeMessage: "你好！👋 我是你的虚拟教练 Kalore Coach。我在这里帮助你实现营养目标。今天我能为你做什么？",
    quickQuestions: [
      "我现在应该吃什么？",
      "我今天的目标完成得怎么样？",
      "晚餐建议",
      "我需要更多蛋白质吗？"
    ],
    quickQuestionsLabel: "快速问题：",
    placeholder: "输入你的问题...",
    error: "错误",
    errorDescription: "无法处理您的消息。请重试。",
    errorMessage: "抱歉，处理您的消息时出现问题。您能再试一次吗？😔",

    // Profile
    accountInformation: "账户信息",
    inviteFriends: "邀请朋友",
    journeyEasierTogether: "一起更容易",
    earnForEachFriend: "每推荐一位朋友赚取10美元",
    shareInviteLink: "分享邀请链接",
    personalDetails: "个人详情",
    editNutritionGoals: "编辑营养目标",
    goalsCurrentWeight: "目标和当前体重",
    weightHistory: "体重历史",
    language: "语言",
    preferences: "偏好设置",
    appearance: "外观",
    chooseAppearance: "选择浅色、深色或系统外观",
    light: "浅色",
    dark: "深色",
    system: "系统",
    liveActivity: "实时活动",
    liveActivityDesc: "在锁屏和动态岛上显示每日卡路里和宏量营养素",
    addBurnedCalories: "添加消耗卡路里",
    addBurnedCaloriesDesc: "将消耗的卡路里添加回每日目标",
    rolloverCalories: "结转卡路里",
    rolloverCaloriesDesc: "将昨天剩余的最多200卡路里添加到今天的每日目标中",
    autoAdjustMacros: "自动调整宏量营养素",
    autoAdjustMacrosDesc: "编辑卡路里或宏量营养素时，自动按比例调整其他值",
    widgets: "小部件",
    howToAdd: "如何添加？",
    widgetConfigSoon: "小部件配置即将推出",
    termsConditions: "条款和条件",
    privacyPolicy: "隐私政策",
    supportEmail: "支持邮箱",
    syncData: "同步数据",
    lastSynced: "最后同步",
    deleteAccount: "删除账户",
    logout: "登出",
    comingSoon: "即将推出",

    // Common
    save: "保存",
    cancel: "取消",
    delete: "删除",
    edit: "编辑",
    done: "完成",
    close: "关闭",
    selectLanguage: "选择语言",
    calories: "卡路里",
    gram: "克",
    grams: "克",
    ml: "毫升",

    // Time
    today: "今天",
    yesterday: "昨天",
    thisMonth: "本月",

    // Food
    confidence: "置信度",
    healthScore: "健康评分",
    servings: "份量",
    mealType: "餐食类型",
    foodItems: "食物项目",
    addFoodItem: "添加食物项目",
    
    // Dashboard Cards
    caloriesLeft: "剩余卡路里",
    stepsToday: "今日步数",
    fiberLeft: "剩余纤维",
    sugarLeft: "剩余糖分",
    sodiumLeft: "剩余钠",

    // Feedback messages
    feedbackQuestion: "这个分析有多准确？",
    accurate: "准确",
    needsWork: "需要改进",
    feedbackThankYou: "谢谢您的反馈！🙏",
    feedbackExplanation: "这些信息将用作参考，帮助AI更准确地分析未来的餐食。",
    
    // Days of the week (abbreviated)
    daysShort: ["日", "一", "二", "三", "四", "五", "六"], // 星期日, 星期一, 星期二, 星期三, 星期四, 星期五, 星期六

    // Buttons
    scanFood: "扫描食物",
    addManually: "手动添加",
    voiceInput: "语音输入",

    // Notifications
    mealSaved: "餐食保存成功！",
    errorSavingMeal: "保存餐食时出错",
    
    // Barcode Scanner
    barcodeScanner: "条码扫描器",
    analyzing: "分析中...",
    keepBarcodeVisible: "保持条码可见以便分析",
    barcodeDetected: "检测到条码！",
    positionBarcodeInFrame: "将条码放在框架内",

    // Weight History Modal
    trendView: "趋势视图",
    average: "平均",
    vsPriorMonth: "vs. 上个月",
    weightThisWeek: "本周",
    weightThisMonth: "7月20日 - 8月18日, 25",
    weightThisPeriod: "3月 - 8月 2025",
    weightWeek: "周",
    weightMonth: "月",
    weightPeriod: "期间",
    weightAverageDescription: "您这个{period}的平均体重（{weight} 公斤）高于您之前30天的平均值81.0公斤。",
    lastUpdated: "最后更新：2025年8月15日，下午12:33",
    addManualMeasurement: "添加手动测量",
    seeAllRecordings: "查看所有记录",
    addWeightMeasurement: "添加体重测量",
    weightKg: "体重（公斤）",
    enterYourWeight: "输入您的体重",
    weightMeasurementNote: "注意：您每7天只能添加一次测量。",
    allRecordings: "所有记录",
    
    // Auth page
    calorieTracking: "卡路里追踪",
    madeEasy: "变得简单",
    getStarted: "开始",
    alreadyHaveAccount: "已有账户？",
    signIn: "登录",
    createAccount: "创建账户",
    welcomeBack: "欢迎回来",
    continueWithGoogle: "使用Google继续",
    or: "或",
    email: "邮箱",
    password: "密码",
    emailPlaceholder: "你的@邮箱.com",
    passwordPlaceholder: "••••••••",
    dontHaveAccount: "没有账户？",
    signUp: "注册",
    fillAllFields: "请填写所有字段",
    accountCreatedSuccess: "账户创建成功！现在您可以登录了。",
    termsPrivacy: "继续即表示您同意我们的服务条款和隐私政策",
    
    // Onboarding
    continue: "继续",
    chooseYourGender: "选择您的性别",
    genderDescription: "这将用于校准您的个人计划。",
    male: "男性",
    female: "女性",
    
    // Welcome Dashboard
    thankYouForYourTime: "感谢您的时间",
    welcomeToPersonalizedDashboard: "欢迎来到您的个性化仪表板",
    preparingYourExperience: "正在准备您的体验...",
    continueToDashboard: "继续到仪表板"
  },

  pt: {
    // Navigation
    home: "Início",
    progress: "Progresso",
    settings: "Configurações",
    profile: "Perfil",
    goals: "Objetivos",
    activity: "Atividade",

    // Dashboard
    dailyCalories: "Calorias Diárias",
    caloriesConsumed: "Calorias Consumidas",
    remaining: "Restantes",
    breakfast: "Café da Manhã",
    lunch: "Almoço",
    dinner: "Jantar",
    snack: "Lanche",
    water: "Água",
    glassesOfWater: "copos de água",
    macros: "Macros",
    protein: "Proteína",
    carbs: "Carboidratos",
    fat: "Gordura",
    fiber: "Fibra",
    totalCalories: "Calorias Totais",
    thisWeek: "Esta Semana",
    dailyAvg: "Média Diária",
    perDay: "Por dia",
    todaysMacros: "Macros de Hoje",
    proteinLeft: "Proteína restante",
    carbsLeft: "Carboidratos restantes",
    fatLeft: "Gordura restante",

    // Recently uploaded
    recentlyUploaded: "Carregado recentemente",
    noRecentMeals: "Nenhuma refeição recente encontrada",
    startScanning: "Comece a escanear sua comida!",
    tapToAddFirstMeal: "Toque + para adicionar sua primeira refeição do dia",

    // Kalore Coach
    kaloreCoach: "Kalore Coach",
    yourPersonalizedVirtualTrainer: "Seu treinador virtual personalizado",
    virtualTrainerReady: "Seu treinador virtual está pronto para ajudá-lo",
    welcomeMessage: "Olá! 👋 Eu sou seu treinador virtual Kalore Coach. Estou aqui para ajudá-lo com seus objetivos nutricionais. Como posso ajudá-lo hoje?",
    quickQuestions: [
      "O que devo comer agora?",
      "Como estou indo com meus objetivos hoje?",
      "Sugestões para o jantar",
      "Preciso de mais proteína?"
    ],
    quickQuestionsLabel: "Perguntas rápidas:",
    placeholder: "Digite sua pergunta...",
    error: "Erro",
    errorDescription: "Não consegui processar sua mensagem. Tente novamente.",
    errorMessage: "Desculpe, houve um problema ao processar sua mensagem. Você poderia tentar novamente? 😔",

    // Profile
    accountInformation: "Informações da Conta",
    inviteFriends: "Convidar Amigos",
    journeyEasierTogether: "A jornada é mais fácil juntos",
    earnForEachFriend: "Ganhe $10 para cada amigo indicado",
    shareInviteLink: "Compartilhar Link de Convite",
    personalDetails: "Detalhes Pessoais",
    editNutritionGoals: "Editar Objetivos Nutricionais",
    goalsCurrentWeight: "Objetivos e Peso Atual",
    weightHistory: "Histórico de Peso",
    language: "Idioma",
    preferences: "Preferências",
    appearance: "Aparência",
    chooseAppearance: "Escolha aparência clara, escura ou do sistema",
    light: "Clara",
    dark: "Escura",
    system: "Sistema",
    liveActivity: "Atividade ao Vivo",
    liveActivityDesc: "Mostre suas calorias e macros diários na tela de bloqueio e ilha dinâmica",
    addBurnedCalories: "Adicionar Calorias Queimadas",
    addBurnedCaloriesDesc: "Adicionar calorias queimadas de volta ao objetivo diário",
    rolloverCalories: "Transferir Calorias",
    rolloverCaloriesDesc: "Adicione até 200 calorias restantes de ontem ao objetivo de hoje",
    autoAdjustMacros: "Ajustar Macros Automaticamente",
    autoAdjustMacrosDesc: "Ao editar calorias ou macronutrientes, ajustar automaticamente os outros valores proporcionalmente",
    widgets: "Widgets",
    howToAdd: "Como adicionar?",
    widgetConfigSoon: "Configuração de widgets em breve",
    termsConditions: "Termos e Condições",
    privacyPolicy: "Política de Privacidade",
    supportEmail: "Email de Suporte",
    syncData: "Sincronizar Dados",
    lastSynced: "Última Sincronização",
    deleteAccount: "Excluir Conta",
    logout: "Sair",
    comingSoon: "Em Breve",

    // Common
    save: "Salvar",
    cancel: "Cancelar",
    delete: "Excluir",
    edit: "Editar",
    done: "Concluído",
    close: "Fechar",
    selectLanguage: "Selecionar Idioma",
    calories: "calorias",
    gram: "g",
    grams: "gramas",
    ml: "ml",

    // Time
    today: "Hoje",
    yesterday: "Ontem",
    thisMonth: "Este Mês",

    // Food
    confidence: "Confiança",
    healthScore: "Pontuação de Saúde",
    servings: "Porções",
    mealType: "Tipo de Refeição",
    foodItems: "Itens de Comida",
    addFoodItem: "Adicionar Item",
    
    // Dashboard Cards
    caloriesLeft: "Calorias restantes",
    stepsToday: "Passos hoje",
    fiberLeft: "Fibra restante",
    sugarLeft: "Açúcar restante",
    sodiumLeft: "Sódio restante",

    // Feedback messages
    feedbackQuestion: "Quão precisa foi esta análise?",
    accurate: "Precisa",
    needsWork: "Precisa melhorar",
    feedbackThankYou: "Obrigado pelo seu feedback! 🙏",
    feedbackExplanation: "Esta informação será usada como referência para que a IA analise refeições futuras com mais precisão.",
    
    // Days of the week (abbreviated)
    daysShort: ["D", "S", "T", "Q", "Q", "S", "S"], // Domingo, Segunda, Terça, Quarta, Quinta, Sexta, Sábado

    // Buttons
    scanFood: "Escanear Comida",
    addManually: "Adicionar Manualmente",
    voiceInput: "Entrada de Voz",

    // Notifications
    mealSaved: "Refeição salva com sucesso!",
    errorSavingMeal: "Erro ao salvar refeição",
    
    // Barcode Scanner
    barcodeScanner: "Scanner de Código de Barras",
    analyzing: "Analisando...",
    keepBarcodeVisible: "Mantenha o código de barras visível para análise",
    barcodeDetected: "Código de barras detectado!",
    positionBarcodeInFrame: "Posicione o código de barras dentro do quadro",

    // Weight History Modal
    trendView: "VISTA DE TENDÊNCIAS",
    average: "MÉDIA",
    vsPriorMonth: "vs. mês anterior",
    weightThisWeek: "ESTA SEMANA",
    weightThisMonth: "20 JUL - 18 AGO, 25",
    weightThisPeriod: "MAR - AGO 2025",
    weightWeek: "semana",
    weightMonth: "mês",
    weightPeriod: "período",
    weightAverageDescription: "Seu peso médio nesta {period} ({weight} kg) estava acima da sua média de 30 dias anterior de 81,0 kg.",
    lastUpdated: "Última atualização: 15 Ago 2025, 12:33",
    addManualMeasurement: "ADICIONAR MEDIÇÃO MANUAL",
    seeAllRecordings: "VER TODAS AS GRAVAÇÕES",
    addWeightMeasurement: "Adicionar Medição de Peso",
    weightKg: "Peso (kg)",
    enterYourWeight: "Digite seu peso",
    weightMeasurementNote: "Nota: Você só pode adicionar uma medição a cada 7 dias.",
    allRecordings: "Todas as Gravações",
    
    // Auth page
    calorieTracking: "Rastreamento de calorias",
    madeEasy: "feito fácil",
    getStarted: "Começar",
    alreadyHaveAccount: "Já tem uma conta?",
    signIn: "Entrar",
    createAccount: "Criar Conta",
    welcomeBack: "Bem-vindo de volta",
    continueWithGoogle: "Continuar com Google",
    or: "ou",
    email: "Email",
    password: "Senha",
    emailPlaceholder: "seu@email.com",
    passwordPlaceholder: "••••••••",
    dontHaveAccount: "Não tem uma conta?",
    signUp: "Inscrever-se",
    fillAllFields: "Por favor preencha todos os campos",
    accountCreatedSuccess: "Conta criada com sucesso! Agora você pode entrar.",
    termsPrivacy: "Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade",
    
    // Onboarding
    continue: "Continuar",
    chooseYourGender: "Escolha seu Gênero",
    genderDescription: "Isso será usado para calibrar seu plano personalizado.",
    male: "Masculino",
    female: "Feminino",
    
    // Welcome Dashboard
    thankYouForYourTime: "Obrigado pelo seu tempo",
    welcomeToPersonalizedDashboard: "Bem-vindo ao seu painel personalizado",
    preparingYourExperience: "Preparando sua experiência...",
    continueToDashboard: "Continuar para o Painel"
  },

  fr: {
    // Navigation
    home: "Accueil",
    progress: "Progrès",
    settings: "Paramètres",
    profile: "Profil",
    goals: "Objectifs",
    activity: "Activité",

    // Dashboard
    dailyCalories: "Calories Quotidiennes",
    caloriesConsumed: "Calories Consommées",
    remaining: "Restantes",
    breakfast: "Petit-déjeuner",
    lunch: "Déjeuner",
    dinner: "Dîner",
    snack: "Collation",
    water: "Eau",
    glassesOfWater: "verres d'eau",
    macros: "Macros",
    protein: "Protéine",
    carbs: "Glucides",
    fat: "Graisse",
    fiber: "Fibre",
    totalCalories: "Calories Totales",
    thisWeek: "Cette Semaine",
    dailyAvg: "Moyenne Quotidienne",
    perDay: "Par jour",
    todaysMacros: "Macros d'Aujourd'hui",
    proteinLeft: "Protéine restante",
    carbsLeft: "Glucides restants",
    fatLeft: "Graisse restante",

    // Recently uploaded
    recentlyUploaded: "Récemment téléchargé",
    noRecentMeals: "Aucun repas récent trouvé",
    startScanning: "Commencez à scanner votre nourriture !",
    tapToAddFirstMeal: "Appuyez sur + pour ajouter votre premier repas de la journée",

    // Kalore Coach
    kaloreCoach: "Kalore Coach",
    yourPersonalizedVirtualTrainer: "Votre entraîneur virtuel personnalisé",
    virtualTrainerReady: "Votre entraîneur virtuel est prêt à vous aider",
    welcomeMessage: "Salut ! 👋 Je suis votre entraîneur virtuel Kalore Coach. Je suis là pour vous aider avec vos objectifs nutritionnels. Comment puis-je vous aider aujourd'hui ?",
    quickQuestions: [
      "Que dois-je manger maintenant ?",
      "Comment vais-je avec mes objectifs aujourd'hui ?",
      "Suggestions pour le dîner",
      "Ai-je besoin de plus de protéines ?"
    ],
    quickQuestionsLabel: "Questions rapides :",
    placeholder: "Tapez votre question...",
    error: "Erreur",
    errorDescription: "Je n'ai pas pu traiter votre message. Veuillez réessayer.",
    errorMessage: "Désolé, il y a eu un problème lors du traitement de votre message. Pourriez-vous réessayer ? 😔",

    // Profile
    accountInformation: "Informations du Compte",
    inviteFriends: "Inviter des Amis",
    journeyEasierTogether: "Le voyage est plus facile ensemble",
    earnForEachFriend: "Gagnez 10$ pour chaque ami parrainé",
    shareInviteLink: "Partager le Lien d'Invitation",
    personalDetails: "Détails Personnels",
    editNutritionGoals: "Modifier les Objectifs Nutritionnels",
    goalsCurrentWeight: "Objectifs et Poids Actuel",
    weightHistory: "Historique du Poids",
    language: "Langue",
    preferences: "Préférences",
    appearance: "Apparence",
    chooseAppearance: "Choisissez l'apparence claire, sombre ou système",
    light: "Claire",
    dark: "Sombre",
    system: "Système",
    liveActivity: "Activité en Direct",
    liveActivityDesc: "Affichez vos calories et macros quotidiennes sur votre écran de verrouillage et île dynamique",
    addBurnedCalories: "Ajouter les Calories Brûlées",
    addBurnedCaloriesDesc: "Ajouter les calories brûlées à l'objectif quotidien",
    rolloverCalories: "Reporter les Calories",
    rolloverCaloriesDesc: "Ajouter jusqu'à 200 calories restantes d'hier à l'objectif d'aujourd'hui",
    autoAdjustMacros: "Ajuster les Macros Automatiquement",
    autoAdjustMacrosDesc: "Lors de l'édition des calories ou macronutriments, ajuster automatiquement les autres valeurs proportionnellement",
    widgets: "Widgets",
    howToAdd: "Comment ajouter ?",
    widgetConfigSoon: "Configuration des widgets bientôt disponible",
    termsConditions: "Termes et Conditions",
    privacyPolicy: "Politique de Confidentialité",
    supportEmail: "Email de Support",
    syncData: "Synchroniser les Données",
    lastSynced: "Dernière Synchronisation",
    deleteAccount: "Supprimer le Compte",
    logout: "Se Déconnecter",
    comingSoon: "Bientôt Disponible",

    // Common
    save: "Sauvegarder",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    done: "Terminé",
    close: "Fermer",
    selectLanguage: "Sélectionner la Langue",
    calories: "calories",
    gram: "g",
    grams: "grammes",
    ml: "ml",

    // Time
    today: "Aujourd'hui",
    yesterday: "Hier",
    thisMonth: "Ce Mois",

    // Food
    confidence: "Confiance",
    healthScore: "Score de Santé",
    servings: "Portions",
    mealType: "Type de Repas",
    foodItems: "Éléments de Nourriture",
    addFoodItem: "Ajouter un Élément",
    
    // Dashboard Cards
    caloriesLeft: "Calories restantes",
    stepsToday: "Pas aujourd'hui",
    fiberLeft: "Fibre restante",
    sugarLeft: "Sucre restant",
    sodiumLeft: "Sodium restant",

    // Feedback messages
    feedbackQuestion: "À quel point cette analyse était-elle précise ?",
    accurate: "Précise",
    needsWork: "À améliorer",
    feedbackThankYou: "Merci pour votre retour ! 🙏",
    feedbackExplanation: "Cette information sera utilisée comme référence pour que l'IA analyse plus précisément les futurs repas.",
    
    // Days of the week (abbreviated)
    daysShort: ["D", "L", "M", "M", "J", "V", "S"], // Dimanche, Lundi, Mardi, Mercredi, Jeudi, Vendredi, Samedi

    // Buttons
    scanFood: "Scanner la Nourriture",
    addManually: "Ajouter Manuellement",
    voiceInput: "Entrée Vocale",

    // Notifications
    mealSaved: "Repas sauvegardé avec succès !",
    errorSavingMeal: "Erreur lors de la sauvegarde du repas",
    
    // Barcode Scanner
    barcodeScanner: "Scanner de Code-Barres",
    analyzing: "Analyse en cours...",
    keepBarcodeVisible: "Gardez le code-barres visible pour l'analyse",
    barcodeDetected: "Code-barres détecté !",
    positionBarcodeInFrame: "Positionnez le code-barres dans le cadre",

    // Weight History Modal
    trendView: "VUE DES TENDANCES",
    average: "MOYENNE",
    vsPriorMonth: "vs. mois précédent",
    weightThisWeek: "CETTE SEMAINE",
    weightThisMonth: "20 JUIL - 18 AOÛT, 25",
    weightThisPeriod: "MAR - AOÛT 2025",
    weightWeek: "semaine",
    weightMonth: "mois",
    weightPeriod: "période",
    weightAverageDescription: "Votre poids moyen cette {period} ({weight} kg) était supérieur à votre moyenne de 30 jours précédente de 81,0 kg.",
    lastUpdated: "Dernière mise à jour : 15 août 2025, 12h33",
    addManualMeasurement: "AJOUTER UNE MESURE MANUELLE",
    seeAllRecordings: "VOIR TOUS LES ENREGISTREMENTS",
    addWeightMeasurement: "Ajouter une Mesure de Poids",
    weightKg: "Poids (kg)",
    enterYourWeight: "Entrez votre poids",
    weightMeasurementNote: "Note : Vous ne pouvez ajouter qu'une mesure tous les 7 jours.",
    allRecordings: "Tous les Enregistrements",
    
    // Auth page
    calorieTracking: "Suivi des calories",
    madeEasy: "rendu facile",
    getStarted: "Commencer",
    alreadyHaveAccount: "Vous avez déjà un compte ?",
    signIn: "Se connecter",
    createAccount: "Créer un compte",
    welcomeBack: "Bon retour",
    continueWithGoogle: "Continuer avec Google",
    or: "ou",
    email: "Email",
    password: "Mot de passe",
    emailPlaceholder: "votre@email.com",
    passwordPlaceholder: "••••••••",
    dontHaveAccount: "Vous n'avez pas de compte ?",
    signUp: "S'inscrire",
    fillAllFields: "Veuillez remplir tous les champs",
    accountCreatedSuccess: "Compte créé avec succès ! Vous pouvez maintenant vous connecter.",
    termsPrivacy: "En continuant, vous acceptez nos Conditions de Service et notre Politique de Confidentialité",
    
    // Onboarding
    continue: "Continuer",
    chooseYourGender: "Choisissez votre Genre",
    genderDescription: "Ceci sera utilisé pour calibrer votre plan personnalisé.",
    male: "Homme",
    female: "Femme",
    
    // Welcome Dashboard
    thankYouForYourTime: "Merci pour votre temps",
    welcomeToPersonalizedDashboard: "Bienvenue sur votre tableau de bord personnalisé",
    preparingYourExperience: "Préparation de votre expérience...",
    continueToDashboard: "Continuer vers le Tableau de Bord"
  },

  de: {
    // Navigation
    home: "Startseite",
    progress: "Fortschritt",
    settings: "Einstellungen",
    profile: "Profil",
    goals: "Ziele",
    activity: "Aktivität",

    // Dashboard
    dailyCalories: "Tägliche Kalorien",
    caloriesConsumed: "Verbrauchte Kalorien",
    remaining: "Verbleibend",
    breakfast: "Frühstück",
    lunch: "Mittagessen",
    dinner: "Abendessen",
    snack: "Snack",
    water: "Wasser",
    glassesOfWater: "Gläser Wasser",
    macros: "Makros",
    protein: "Protein",
    carbs: "Kohlenhydrate",
    fat: "Fett",
    fiber: "Ballaststoffe",
    totalCalories: "Gesamtkalorien",
    thisWeek: "Diese Woche",
    dailyAvg: "Täglicher Durchschnitt",
    perDay: "Pro Tag",
    todaysMacros: "Heutige Makros",
    proteinLeft: "Protein übrig",
    carbsLeft: "Kohlenhydrate übrig",
    fatLeft: "Fett übrig",

    // Recently uploaded
    recentlyUploaded: "Kürzlich hochgeladen",
    noRecentMeals: "Keine aktuellen Mahlzeiten gefunden",
    startScanning: "Beginnen Sie mit dem Scannen Ihres Essens!",
    tapToAddFirstMeal: "Tippen Sie auf +, um Ihre erste Mahlzeit des Tages hinzuzufügen",

    // Kalore Coach
    kaloreCoach: "Kalore Coach",
    yourPersonalizedVirtualTrainer: "Ihr personalisierter virtueller Trainer",
    virtualTrainerReady: "Ihr virtueller Trainer ist bereit, Ihnen zu helfen",
    welcomeMessage: "Hallo! 👋 Ich bin Ihr virtueller Trainer Kalore Coach. Ich bin hier, um Ihnen bei Ihren Ernährungszielen zu helfen. Wie kann ich Ihnen heute helfen?",
    quickQuestions: [
      "Was soll ich jetzt essen?",
      "Wie geht es mir heute mit meinen Zielen?",
      "Vorschläge für das Abendessen",
      "Brauche ich mehr Protein?"
    ],
    quickQuestionsLabel: "Schnelle Fragen:",
    placeholder: "Geben Sie Ihre Frage ein...",
    error: "Fehler",
    errorDescription: "Ich konnte Ihre Nachricht nicht verarbeiten. Bitte versuchen Sie es erneut.",
    errorMessage: "Entschuldigung, es gab ein Problem bei der Verarbeitung Ihrer Nachricht. Könnten Sie es erneut versuchen? 😔",

    // Profile
    accountInformation: "Kontoinformationen",
    inviteFriends: "Freunde Einladen",
    journeyEasierTogether: "Die Reise ist einfacher zusammen",
    earnForEachFriend: "Verdienen Sie 10$ für jeden geworbenen Freund",
    shareInviteLink: "Einladungslink Teilen",
    personalDetails: "Persönliche Details",
    editNutritionGoals: "Ernährungsziele Bearbeiten",
    goalsCurrentWeight: "Ziele & Aktuelles Gewicht",
    weightHistory: "Gewichtsverlauf",
    language: "Sprache",
    preferences: "Einstellungen",
    appearance: "Erscheinungsbild",
    chooseAppearance: "Wählen Sie helles, dunkles oder System-Erscheinungsbild",
    light: "Hell",
    dark: "Dunkel",
    system: "System",
    liveActivity: "Live-Aktivität",
    liveActivityDesc: "Zeigen Sie Ihre täglichen Kalorien und Makros auf Ihrem Sperrbildschirm und der dynamischen Insel",
    addBurnedCalories: "Verbrannte Kalorien Hinzufügen",
    addBurnedCaloriesDesc: "Verbrannte Kalorien zum täglichen Ziel hinzufügen",
    rolloverCalories: "Kalorien Übertragen",
    rolloverCaloriesDesc: "Bis zu 200 übrige Kalorien von gestern zum heutigen Ziel hinzufügen",
    autoAdjustMacros: "Makros Automatisch Anpassen",
    autoAdjustMacrosDesc: "Beim Bearbeiten von Kalorien oder Makronährstoffen automatisch die anderen Werte proportional anpassen",
    widgets: "Widgets",
    howToAdd: "Wie hinzufügen?",
    widgetConfigSoon: "Widget-Konfiguration bald verfügbar",
    termsConditions: "Geschäftsbedingungen",
    privacyPolicy: "Datenschutzrichtlinie",
    supportEmail: "Support-E-Mail",
    syncData: "Daten Synchronisieren",
    lastSynced: "Zuletzt Synchronisiert",
    deleteAccount: "Konto Löschen",
    logout: "Abmelden",
    comingSoon: "Bald Verfügbar",

    // Common
    save: "Speichern",
    cancel: "Abbrechen",
    delete: "Löschen",
    edit: "Bearbeiten",
    done: "Fertig",
    close: "Schließen",
    selectLanguage: "Sprache Auswählen",
    calories: "Kalorien",
    gram: "g",
    grams: "Gramm",
    ml: "ml",

    // Time
    today: "Heute",
    yesterday: "Gestern",
    thisMonth: "Dieser Monat",

    // Food
    confidence: "Vertrauen",
    healthScore: "Gesundheitswert",
    servings: "Portionen",
    mealType: "Mahlzeitart",
    foodItems: "Lebensmittel",
    addFoodItem: "Lebensmittel Hinzufügen",
    
    // Dashboard Cards
    caloriesLeft: "Kalorien übrig",
    stepsToday: "Schritte heute",
    fiberLeft: "Ballaststoffe übrig",
    sugarLeft: "Zucker übrig",
    sodiumLeft: "Natrium übrig",

    // Feedback messages
    feedbackQuestion: "Wie genau war diese Analyse?",
    accurate: "Genau",
    needsWork: "Verbesserungsbedürftig",
    feedbackThankYou: "Vielen Dank für Ihr Feedback! 🙏",
    feedbackExplanation: "Diese Information wird als Referenz verwendet, damit die KI zukünftige Mahlzeiten genauer analysiert.",
    
    // Days of the week (abbreviated)
    daysShort: ["S", "M", "D", "M", "D", "F", "S"], // Sonntag, Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag

    // Buttons
    scanFood: "Essen Scannen",
    addManually: "Manuell Hinzufügen",
    voiceInput: "Spracheingabe",

    // Notifications
    mealSaved: "Mahlzeit erfolgreich gespeichert!",
    errorSavingMeal: "Fehler beim Speichern der Mahlzeit",
    
    // Barcode Scanner
    barcodeScanner: "Barcode-Scanner",
    analyzing: "Analysiere...",
    keepBarcodeVisible: "Halten Sie den Barcode für die Analyse sichtbar",
    barcodeDetected: "Barcode erkannt!",
    positionBarcodeInFrame: "Positionieren Sie den Barcode im Rahmen",

    // Weight History Modal
    trendView: "TRENDANSICHT",
    average: "DURCHSCHNITT",
    vsPriorMonth: "vs. vorheriger Monat",
    weightThisWeek: "DIESE WOCHE",
    weightThisMonth: "20. JULI - 18. AUG, 25",
    weightThisPeriod: "MÄR - AUG 2025",
    weightWeek: "Woche",
    weightMonth: "Monat",
    weightPeriod: "Zeitraum",
    weightAverageDescription: "Ihr durchschnittliches Gewicht diese {period} ({weight} kg) lag über Ihrem vorherigen 30-Tage-Durchschnitt von 81,0 kg.",
    lastUpdated: "Zuletzt aktualisiert: 15. Aug 2025, 12:33 Uhr",
    addManualMeasurement: "MANUELLE MESSUNG HINZUFÜGEN",
    seeAllRecordings: "ALLE AUFZEICHNUNGEN ANZEIGEN",
    addWeightMeasurement: "Gewichtsmessung hinzufügen",
    weightKg: "Gewicht (kg)",
    enterYourWeight: "Geben Sie Ihr Gewicht ein",
    weightMeasurementNote: "Hinweis: Sie können nur alle 7 Tage eine Messung hinzufügen.",
    allRecordings: "Alle Aufzeichnungen",
    
    // Auth page
    calorieTracking: "Kalorienverfolgung",
    madeEasy: "einfach gemacht",
    getStarted: "Loslegen",
    alreadyHaveAccount: "Haben Sie bereits ein Konto?",
    signIn: "Anmelden",
    createAccount: "Konto erstellen",
    welcomeBack: "Willkommen zurück",
    continueWithGoogle: "Mit Google fortfahren",
    or: "oder",
    email: "E-Mail",
    password: "Passwort",
    emailPlaceholder: "ihre@email.com",
    passwordPlaceholder: "••••••••",
    dontHaveAccount: "Haben Sie kein Konto?",
    signUp: "Registrieren",
    fillAllFields: "Bitte füllen Sie alle Felder aus",
    accountCreatedSuccess: "Konto erfolgreich erstellt! Sie können sich jetzt anmelden.",
    termsPrivacy: "Durch Fortfahren stimmen Sie unseren Nutzungsbedingungen und Datenschutzrichtlinien zu",
    
    // Onboarding
    continue: "Weiter",
    chooseYourGender: "Wählen Sie Ihr Geschlecht",
    genderDescription: "Dies wird verwendet, um Ihren individuellen Plan zu kalibrieren.",
    male: "Männlich",
    female: "Weiblich",
    
    // Welcome Dashboard
    thankYouForYourTime: "Vielen Dank für Ihre Zeit",
    welcomeToPersonalizedDashboard: "Willkommen zu Ihrem personalisierten Dashboard",
    preparingYourExperience: "Ihre Erfahrung wird vorbereitet...",
    continueToDashboard: "Weiter zum Dashboard"
  },

  it: {
    // Navigation
    home: "Home",
    progress: "Progressi",
    settings: "Impostazioni",
    profile: "Profilo",
    goals: "Obiettivi",
    activity: "Attività",

    // Dashboard
    dailyCalories: "Calorie Giornaliere",
    caloriesConsumed: "Calorie Consumate",
    remaining: "Rimanenti",
    breakfast: "Colazione",
    lunch: "Pranzo",
    dinner: "Cena",
    snack: "Spuntino",
    water: "Acqua",
    glassesOfWater: "bicchieri d'acqua",
    macros: "Macro",
    protein: "Proteine",
    carbs: "Carboidrati",
    fat: "Grassi",
    fiber: "Fibre",
    totalCalories: "Calorie Totali",
    thisWeek: "Questa Settimana",
    dailyAvg: "Media Giornaliera",
    perDay: "Al giorno",
    todaysMacros: "Macro di Oggi",
    proteinLeft: "Proteine rimanenti",
    carbsLeft: "Carboidrati rimanenti",
    fatLeft: "Grassi rimanenti",

    // Recently uploaded
    recentlyUploaded: "Caricato di recente",
    noRecentMeals: "Nessun pasto recente trovato",
    startScanning: "Inizia a scansionare il tuo cibo!",
    tapToAddFirstMeal: "Tocca + per aggiungere il tuo primo pasto della giornata",

    // Kalore Coach
    kaloreCoach: "Kalore Coach",
    yourPersonalizedVirtualTrainer: "Il tuo allenatore virtuale personalizzato",
    virtualTrainerReady: "Il tuo allenatore virtuale è pronto ad aiutarti",
    welcomeMessage: "Ciao! 👋 Sono il tuo allenatore virtuale Kalore Coach. Sono qui per aiutarti con i tuoi obiettivi nutrizionali. Come posso aiutarti oggi?",
    quickQuestions: [
      "Cosa dovrei mangiare ora?",
      "Come sto andando con i miei obiettivi oggi?",
      "Suggerimenti per la cena",
      "Ho bisogno di più proteine?"
    ],
    quickQuestionsLabel: "Domande rapide:",
    placeholder: "Digita la tua domanda...",
    error: "Errore",
    errorDescription: "Non sono riuscito a elaborare il tuo messaggio. Riprova.",
    errorMessage: "Scusa, c'è stato un problema nell'elaborare il tuo messaggio. Potresti riprovare? 😔",

    // Profile
    accountInformation: "Informazioni Account",
    inviteFriends: "Invita Amici",
    journeyEasierTogether: "Il viaggio è più facile insieme",
    earnForEachFriend: "Guadagna $10 per ogni amico segnalato",
    shareInviteLink: "Condividi Link di Invito",
    personalDetails: "Dettagli Personali",
    editNutritionGoals: "Modifica Obiettivi Nutrizionali",
    goalsCurrentWeight: "Obiettivi e Peso Attuale",
    weightHistory: "Storia del Peso",
    language: "Lingua",
    preferences: "Preferenze",
    appearance: "Aspetto",
    chooseAppearance: "Scegli aspetto chiaro, scuro o di sistema",
    light: "Chiaro",
    dark: "Scuro",
    system: "Sistema",
    liveActivity: "Attività Live",
    liveActivityDesc: "Mostra le tue calorie e macro giornaliere sulla schermata di blocco e isola dinamica",
    addBurnedCalories: "Aggiungi Calorie Bruciate",
    addBurnedCaloriesDesc: "Aggiungi le calorie bruciate all'obiettivo giornaliero",
    rolloverCalories: "Trasferisci Calorie",
    rolloverCaloriesDesc: "Aggiungi fino a 200 calorie rimaste da ieri all'obiettivo di oggi",
    autoAdjustMacros: "Regola Macro Automaticamente",
    autoAdjustMacrosDesc: "Quando modifichi calorie o macronutrienti, regola automaticamente gli altri valori proporzionalmente",
    widgets: "Widget",
    howToAdd: "Come aggiungere?",
    widgetConfigSoon: "Configurazione widget presto disponibile",
    termsConditions: "Termini e Condizioni",
    privacyPolicy: "Politica sulla Privacy",
    supportEmail: "Email di Supporto",
    syncData: "Sincronizza Dati",
    lastSynced: "Ultima Sincronizzazione",
    deleteAccount: "Elimina Account",
    logout: "Esci",
    comingSoon: "Prossimamente",

    // Common
    save: "Salva",
    cancel: "Annulla",
    delete: "Elimina",
    edit: "Modifica",
    done: "Fatto",
    close: "Chiudi",
    selectLanguage: "Seleziona Lingua",
    calories: "calorie",
    gram: "g",
    grams: "grammi",
    ml: "ml",

    // Time
    today: "Oggi",
    yesterday: "Ieri",
    thisMonth: "Questo Mese",

    // Food
    confidence: "Fiducia",
    healthScore: "Punteggio Salute",
    servings: "Porzioni",
    mealType: "Tipo di Pasto",
    foodItems: "Elementi Cibo",
    addFoodItem: "Aggiungi Elemento",
    
    // Dashboard Cards
    caloriesLeft: "Calorie rimaste",
    stepsToday: "Passi oggi",
    fiberLeft: "Fibre rimaste",
    sugarLeft: "Zucchero rimasto",
    sodiumLeft: "Sodio rimasto",

    // Feedback messages
    feedbackQuestion: "Quanto è stata precisa questa analisi?",
    accurate: "Precisa",
    needsWork: "Deve migliorare",
    feedbackThankYou: "Grazie per il tuo feedback! 🙏",
    feedbackExplanation: "Queste informazioni saranno utilizzate come riferimento per far analizzare all'IA i pasti futuri con maggiore precisione.",
    
    // Days of the week (abbreviated)
    daysShort: ["D", "L", "M", "M", "G", "V", "S"], // Domenica, Lunedì, Martedì, Mercoledì, Giovedì, Venerdì, Sabato

    // Buttons
    scanFood: "Scansiona Cibo",
    addManually: "Aggiungi Manualmente",
    voiceInput: "Input Vocale",

    // Notifications
    mealSaved: "Pasto salvato con successo!",
    errorSavingMeal: "Errore nel salvare il pasto",
    
    // Barcode Scanner
    barcodeScanner: "Scanner Codice a Barre",
    analyzing: "Analizzando...",
    keepBarcodeVisible: "Mantieni il codice a barre visibile per l'analisi",
    barcodeDetected: "Codice a barre rilevato!",
    positionBarcodeInFrame: "Posiziona il codice a barre nel riquadro",

    // Weight History Modal
    trendView: "VISTA TENDENZE",
    average: "MEDIA",
    vsPriorMonth: "vs. mese precedente",
    weightThisWeek: "QUESTA SETTIMANA",
    weightThisMonth: "20 LUG - 18 AGO, 25",
    weightThisPeriod: "MAR - AGO 2025",
    weightWeek: "settimana",
    weightMonth: "mese",
    weightPeriod: "periodo",
    weightAverageDescription: "Il tuo peso medio questo {period} ({weight} kg) era superiore alla tua media di 30 giorni precedente di 81,0 kg.",
    lastUpdated: "Ultimo aggiornamento: 15 Ago 2025, 12:33",
    addManualMeasurement: "AGGIUNGI MISURAZIONE MANUALE",
    seeAllRecordings: "VEDI TUTTE LE REGISTRAZIONI",
    addWeightMeasurement: "Aggiungi Misurazione Peso",
    weightKg: "Peso (kg)",
    enterYourWeight: "Inserisci il tuo peso",
    weightMeasurementNote: "Nota: Puoi aggiungere solo una misurazione ogni 7 giorni.",
    allRecordings: "Tutte le Registrazioni",
    
    // Auth page
    calorieTracking: "Tracciamento calorie",
    madeEasy: "reso facile",
    getStarted: "Inizia",
    alreadyHaveAccount: "Hai già un account?",
    signIn: "Accedi",
    createAccount: "Crea Account",
    welcomeBack: "Bentornato",
    continueWithGoogle: "Continua con Google",
    or: "o",
    email: "Email",
    password: "Password",
    emailPlaceholder: "tua@email.com",
    passwordPlaceholder: "••••••••",
    dontHaveAccount: "Non hai un account?",
    signUp: "Registrati",
    fillAllFields: "Si prega di compilare tutti i campi",
    accountCreatedSuccess: "Account creato con successo! Ora puoi accedere.",
    termsPrivacy: "Continuando, accetti i nostri Termini di Servizio e l'Informativa sulla Privacy",
    
    // Onboarding
    continue: "Continua",
    chooseYourGender: "Scegli il tuo Genere",
    genderDescription: "Questo sarà utilizzato per calibrare il tuo piano personalizzato.",
    male: "Maschio",
    female: "Femmina",
    
    // Welcome Dashboard
    thankYouForYourTime: "Grazie per il tuo tempo",
    welcomeToPersonalizedDashboard: "Benvenuto nella tua dashboard personalizzata",
    preparingYourExperience: "Preparando la tua esperienza...",
    continueToDashboard: "Continua alla Dashboard"
  },

  ru: {
    // Navigation
    home: "Главная",
    progress: "Прогресс",
    settings: "Настройки",
    profile: "Профиль",
    goals: "Цели",
    activity: "Активность",

    // Dashboard
    dailyCalories: "Дневные Калории",
    caloriesConsumed: "Потреблено Калорий",
    remaining: "Осталось",
    breakfast: "Завтрак",
    lunch: "Обед",
    dinner: "Ужин",
    snack: "Перекус",
    water: "Вода",
    glassesOfWater: "стаканов воды",
    macros: "Макросы",
    protein: "Белки",
    carbs: "Углеводы",
    fat: "Жиры",
    fiber: "Клетчатка",
    totalCalories: "Общие Калории",
    thisWeek: "На Этой Неделе",
    dailyAvg: "Среднее За День",
    perDay: "В день",
    todaysMacros: "Макросы Сегодня",
    proteinLeft: "Белки осталось",
    carbsLeft: "Углеводы осталось",
    fatLeft: "Жиры осталось",

    // Recently uploaded
    recentlyUploaded: "Недавно загружено",
    noRecentMeals: "Недавние приемы пищи не найдены",
    startScanning: "Начните сканировать вашу еду!",
    tapToAddFirstMeal: "Нажмите +, чтобы добавить первый прием пищи дня",

    // Kalore Coach
    kaloreCoach: "Kalore Coach",
    yourPersonalizedVirtualTrainer: "Ваш персонализированный виртуальный тренер",
    virtualTrainerReady: "Ваш виртуальный тренер готов помочь вам",
    welcomeMessage: "Привет! 👋 Я ваш виртуальный тренер Kalore Coach. Я здесь, чтобы помочь вам с вашими целями питания. Как я могу помочь вам сегодня?",
    quickQuestions: [
      "Что мне сейчас съесть?",
      "Как дела с моими целями сегодня?",
      "Предложения для ужина",
      "Нужно ли мне больше белка?"
    ],
    quickQuestionsLabel: "Быстрые вопросы:",
    placeholder: "Введите ваш вопрос...",
    error: "Ошибка",
    errorDescription: "Я не смог обработать ваше сообщение. Попробуйте еще раз.",
    errorMessage: "Извините, возникла проблема при обработке вашего сообщения. Не могли бы вы попробовать еще раз? 😔",

    // Profile
    accountInformation: "Информация об Аккаунте",
    inviteFriends: "Пригласить Друзей",
    journeyEasierTogether: "Путешествие легче вместе",
    earnForEachFriend: "Зарабатывайте $10 за каждого приглашенного друга",
    shareInviteLink: "Поделиться Ссылкой-Приглашением",
    personalDetails: "Личные Данные",
    editNutritionGoals: "Редактировать Цели Питания",
    goalsCurrentWeight: "Цели и Текущий Вес",
    weightHistory: "История Веса",
    language: "Язык",
    preferences: "Предпочтения",
    appearance: "Внешний Вид",
    chooseAppearance: "Выберите светлый, темный или системный вид",
    light: "Светлый",
    dark: "Темный",
    system: "Системный",
    liveActivity: "Живая Активность",
    liveActivityDesc: "Показывать ваши дневные калории и макросы на экране блокировки и динамическом острове",
    addBurnedCalories: "Добавить Сожженные Калории",
    addBurnedCaloriesDesc: "Добавить сожженные калории обратно к дневной цели",
    rolloverCalories: "Перенести Калории",
    rolloverCaloriesDesc: "Добавить до 200 оставшихся калорий со вчера к сегодняшней цели",
    autoAdjustMacros: "Автоматически Настроить Макросы",
    autoAdjustMacrosDesc: "При редактировании калорий или макронутриентов автоматически корректировать другие значения пропорционально",
    widgets: "Виджеты",
    howToAdd: "Как добавить?",
    widgetConfigSoon: "Настройка виджетов скоро будет доступна",
    termsConditions: "Условия и Положения",
    privacyPolicy: "Политика Конфиденциальности",
    supportEmail: "Email Поддержки",
    syncData: "Синхронизировать Данные",
    lastSynced: "Последняя Синхронизация",
    deleteAccount: "Удалить Аккаунт",
    logout: "Выйти",
    comingSoon: "Скоро Будет",

    // Common
    save: "Сохранить",
    cancel: "Отмена",
    delete: "Удалить",
    edit: "Редактировать",
    done: "Готово",
    close: "Закрыть",
    selectLanguage: "Выбрать Язык",
    calories: "калории",
    gram: "г",
    grams: "граммы",
    ml: "мл",

    // Time
    today: "Сегодня",
    yesterday: "Вчера",
    thisMonth: "В Этом Месяце",

    // Food
    confidence: "Уверенность",
    healthScore: "Оценка Здоровья",
    servings: "Порции",
    mealType: "Тип Приема Пищи",
    foodItems: "Продукты",
    addFoodItem: "Добавить Продукт",
    
    // Dashboard Cards
    caloriesLeft: "Калории осталось",
    stepsToday: "Шаги сегодня",
    fiberLeft: "Клетчатка осталось",
    sugarLeft: "Сахар осталось",
    sodiumLeft: "Натрий осталось",

    // Feedback messages
    feedbackQuestion: "Насколько точным был этот анализ?",
    accurate: "Точно",
    needsWork: "Нужно улучшить",
    feedbackThankYou: "Спасибо за ваш отзыв! 🙏",
    feedbackExplanation: "Эта информация будет использоваться как справочная для того, чтобы ИИ более точно анализировал будущие приемы пищи.",
    
    // Days of the week (abbreviated)
    daysShort: ["В", "П", "В", "С", "Ч", "П", "С"], // Воскресенье, Понедельник, Вторник, Среда, Четверг, Пятница, Суббота

    // Buttons
    scanFood: "Сканировать Еду",
    addManually: "Добавить Вручную",
    voiceInput: "Голосовой Ввод",

    // Notifications
    mealSaved: "Прием пищи успешно сохранен!",
    errorSavingMeal: "Ошибка сохранения приема пищи",
    
    // Barcode Scanner
    barcodeScanner: "Сканер Штрих-кода",
    analyzing: "Анализирую...",
    keepBarcodeVisible: "Держите штрих-код видимым для анализа",
    barcodeDetected: "Штрих-код обнаружен!",
    positionBarcodeInFrame: "Поместите штрих-код в рамку",

    // Weight History Modal
    trendView: "ВИД ТРЕНДА",
    average: "СРЕДНЕЕ",
    vsPriorMonth: "против предыдущего месяца",
    weightThisWeek: "НА ЭТОЙ НЕДЕЛЕ",
    weightThisMonth: "20 ИЮЛЯ - 18 АВГ, 25",
    weightThisPeriod: "МАР - АВГ 2025",
    weightWeek: "неделя",
    weightMonth: "месяц",
    weightPeriod: "период",
    weightAverageDescription: "Ваш средний вес в этом {period} ({weight} кг) был выше вашего предыдущего 30-дневного среднего значения 81,0 кг.",
    lastUpdated: "Последнее обновление: 15 авг 2025, 12:33",
    addManualMeasurement: "ДОБАВИТЬ РУЧНОЕ ИЗМЕРЕНИЕ",
    seeAllRecordings: "ПОСМОТРЕТЬ ВСЕ ЗАПИСИ",
    addWeightMeasurement: "Добавить Измерение Веса",
    weightKg: "Вес (кг)",
    enterYourWeight: "Введите ваш вес",
    weightMeasurementNote: "Примечание: Вы можете добавлять только одно измерение каждые 7 дней.",
    allRecordings: "Все Записи",
    
    // Auth page
    calorieTracking: "Отслеживание калорий",
    madeEasy: "стало просто",
    getStarted: "Начать",
    alreadyHaveAccount: "Уже есть аккаунт?",
    signIn: "Войти",
    createAccount: "Создать аккаунт",
    welcomeBack: "Добро пожаловать обратно",
    continueWithGoogle: "Продолжить с Google",
    or: "или",
    email: "Email",
    password: "Пароль",
    emailPlaceholder: "ваш@email.com",
    passwordPlaceholder: "••••••••",
    dontHaveAccount: "Нет аккаунта?",
    signUp: "Зарегистрироваться",
    fillAllFields: "Пожалуйста, заполните все поля",
    accountCreatedSuccess: "Аккаунт успешно создан! Теперь вы можете войти.",
    termsPrivacy: "Продолжая, вы соглашаетесь с нашими Условиями обслуживания и Политикой конфиденциальности",
    
    // Onboarding
    continue: "Продолжить",
    chooseYourGender: "Выберите ваш пол",
    genderDescription: "Это будет использовано для калибровки вашего персонального плана.",
    male: "Мужской",
    female: "Женский",
    
    // Welcome Dashboard
    thankYouForYourTime: "Спасибо за ваше время",
    welcomeToPersonalizedDashboard: "Добро пожаловать в ваш персональный дашборд",
    preparingYourExperience: "Подготавливаем ваш опыт...",
    continueToDashboard: "Перейти к Дашборду"
  }
};

// Function to get device language
export const getDeviceLanguage = (): string => {
  const language = navigator.language || (navigator as any).userLanguage;
  const langCode = language.split('-')[0];
  
  // Check if we support this language
  if (translations[langCode]) {
    return langCode;
  }
  
  // Default to English
  return 'en';
};

// Function to get current app language
export const getCurrentLanguage = (): string => {
  return localStorage.getItem('appLanguage') || getDeviceLanguage();
};

// Function to set app language
export const setAppLanguage = (languageCode: string): void => {
  localStorage.setItem('appLanguage', languageCode);
  window.dispatchEvent(new CustomEvent('languageChange', { detail: languageCode }));
};

// Function to get translations for current language
export const getTranslations = (languageCode?: string): Translations => {
  const currentLang = languageCode || getCurrentLanguage();
  return translations[currentLang] || translations.en;
};