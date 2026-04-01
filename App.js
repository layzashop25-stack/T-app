import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, ShareTechMono_400Regular } from '@expo-google-fonts/share-tech-mono';
import { Poppins_700Bold, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

// ─── THEME ───────────────────────────────────────────────
const GLOW_COLOR  = '#00BFA5';
const GLOW_DIM    = '#B2DFDB';
const GLOW_MID    = '#00897B';
const BG          = '#FFFFFF';
const TITLE_COLOR = '#FF5733';
const TARGET_DATE = new Date(new Date().getFullYear() + 1, 0, 1);
// ─────────────────────────────────────────────────────────

const { width } = Dimensions.get('window');
const CARD_PADDING = 32;
const TOTAL_CHARS  = 13;
const DIGIT_FONT   = Math.floor(((width - CARD_PADDING * 2) / TOTAL_CHARS) * 1.05);

function getTimeLeft() {
  const now = new Date();
  let diff  = Math.max(0, Math.floor((TARGET_DATE - now) / 1000));
  const days    = Math.floor(diff / 86400); diff -= days * 86400;
  const hours   = Math.floor(diff / 3600);  diff -= hours * 3600;
  const minutes = Math.floor(diff / 60);
  const seconds = diff % 60;
  return { days, hours, minutes, seconds };
}

function pad(n, len = 2) { return String(n).padStart(len, '0'); }

function LcdDigits({ value }) {
  return (
    <View>
      <Text style={styles.ghostDigit}>{'8'.repeat(value.length)}</Text>
      <Text style={styles.activeDigit}>{value}</Text>
    </View>
  );
}

function Block({ value, label }) {
  return (
    <View style={styles.block}>
      <LcdDigits value={value} />
      {!!label && <Text style={styles.blockLabel}>{label}</Text>}
    </View>
  );
}

function Colon() {
  return <Text style={styles.colon}>:</Text>;
}

export default function App() {
  const [time, setTime] = useState(getTimeLeft());

  const [fontsLoaded] = useFonts({
    ShareTechMono_400Regular,
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: BG }} />;

  const year      = new Date().getFullYear();
  const totalMs   = new Date(year + 1, 0, 1) - new Date(year, 0, 1);
  const passedMs  = new Date() - new Date(year, 0, 1);
  const progress  = Math.min(passedMs / totalMs, 1);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <Text style={styles.title}>TIME IS RUNNING OUT</Text>
        <Text style={styles.subtitle}>MAKE EVERY DAY COUNT</Text>
      </View>

      {/* ── CARD ── */}
      <View style={styles.card}>
        <LinearGradient
          colors={[GLOW_COLOR, '#80CBC4', GLOW_COLOR]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={styles.cardAccent}
        />

        <Text style={styles.untilLabel}>Until Jan 1, {year + 1}</Text>

        {/* CLOCK */}
        <View style={styles.clockRow}>
          <Block value={pad(time.days, 3)} label="DAYS" />
          <Colon />
          <Block value={pad(time.hours)}   label="HRS"  />
          <Colon />
          <Block value={pad(time.minutes)} label="MIN"  />
          <Colon />
          <Block value={pad(time.seconds)} label="SEC"  />
        </View>

        {/* REFLECTION */}
        <View style={styles.reflectionWrap}>
          <View style={[styles.clockRow, { opacity: 0.12, transform: [{ scaleY: -1 }] }]}>
            <Block value={pad(time.days, 3)} label="" />
            <Colon />
            <Block value={pad(time.hours)}   label="" />
            <Colon />
            <Block value={pad(time.minutes)} label="" />
            <Colon />
            <Block value={pad(time.seconds)} label="" />
          </View>
          <LinearGradient colors={['transparent', '#F8F8F8']} style={StyleSheet.absoluteFill} />
        </View>
      </View>

      {/* ── PROGRESS ── */}
      <View style={styles.progressSection}>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>Year Progress</Text>
          <Text style={[styles.progressLabel, { color: GLOW_COLOR, fontFamily: 'Poppins_600SemiBold' }]}>
            {(progress * 100).toFixed(3)}%
          </Text>
        </View>
        <View style={styles.progressBg}>
          <LinearGradient
            colors={[GLOW_COLOR, '#80CBC4']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${(progress * 100).toFixed(3)}%` }]}
          />
        </View>
        <Text style={styles.progressSub}>
          {time.days} days · {time.hours} hrs · {time.minutes} min · {time.seconds} sec remaining
        </Text>
      </View>

      <Text style={styles.footer}>© Mohammed Seffar</Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: CARD_PADDING,
    gap: 32,
  },

  // ── Header
  header: { alignItems: 'center', gap: 6 },
  title: {
    fontFamily: 'Poppins_700Bold',
    color: TITLE_COLOR,
    fontSize: 20,
    letterSpacing: 2,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    color: '#AAAAAA',
    fontSize: 11,
    letterSpacing: 4,
    textAlign: 'center',
  },

  // ── Card
  card: {
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderRadius: 24,
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: GLOW_COLOR,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  cardAccent: { width: '100%', height: 4 },

  untilLabel: {
    fontFamily: 'Poppins_400Regular',
    color: '#AAAAAA',
    fontSize: 11,
    letterSpacing: 2,
    marginTop: 14,
    marginBottom: 2,
  },

  // ── Clock
  clockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width - CARD_PADDING * 2,
    paddingHorizontal: 4,
    paddingTop: 8,
  },

  block: { alignItems: 'center' },

  ghostDigit: {
    fontFamily: 'ShareTechMono_400Regular',
    fontSize: DIGIT_FONT,
    color: GLOW_DIM,
    includeFontPadding: false,
    lineHeight: DIGIT_FONT * 1.15,
  },
  activeDigit: {
    fontFamily: 'ShareTechMono_400Regular',
    fontSize: DIGIT_FONT,
    color: GLOW_COLOR,
    includeFontPadding: false,
    lineHeight: DIGIT_FONT * 1.15,
    position: 'absolute',
    top: 0,
    left: 0,
    textShadowColor: GLOW_COLOR,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },

  blockLabel: {
    fontFamily: 'Poppins_600SemiBold',
    color: GLOW_MID,
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 2,
    marginBottom: 12,
  },

  colon: {
    fontFamily: 'ShareTechMono_400Regular',
    fontSize: DIGIT_FONT,
    color: GLOW_COLOR,
    includeFontPadding: false,
    lineHeight: DIGIT_FONT * 1.15,
    marginBottom: 14,
    textShadowColor: GLOW_COLOR,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },

  // ── Reflection
  reflectionWrap: {
    height: DIGIT_FONT * 0.45,
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
  },

  // ── Progress
  progressSection: { width: '100%', gap: 8 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressLabel: {
    fontFamily: 'Poppins_400Regular',
    color: '#AAAAAA',
    fontSize: 12,
  },
  progressBg: {
    width: '100%',
    height: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 10 },
  progressSub: {
    fontFamily: 'Poppins_400Regular',
    color: '#CCCCCC',
    fontSize: 10,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
