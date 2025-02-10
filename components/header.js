e770e4bf1bec80f4e01bc4c136af604ebcef3614		branch 'main' of https://github.com/RaoAsad0/reactnative_staffapp
f6502bd77514d65edc08b746231c3d98a1f34322	not-for-merge	branch 'manual_scan' of https://github.com/RaoAsad0/reactnative_staffapp
1b9e2e544528b2de1ea46b815db94d2b6a223664	not-for-merge	branch 'master' of https://github.com/RaoAsad0/reactnative_staffapp
                                                                                                                                                         poImage source={require('../assets/images/drawer-icon.png')} style={styles.drawerIcon} />
          <Text style={styles.countryName}>OUTMOSPHERE</Text>
          <Text style={styles.cityName}>Accra</Text>
          <Text style={styles.date}>28-12-2024</Text>
          <Text style={styles.date}>at</Text>
          <Text style={styles.time}>7:00 PM</Text>
        </View>
        <View style={styles.profileId}>
          <ExpoImage source={require('../assets/images/user.png')} style={styles.userIcon} />
          <Text style={styles.userId}>ID: 87621237467</Text>
          <Text style={[styles.scan, { marginLeft: width * 0.25 }]}>Scans</Text>
          <View style={styles.count}>
            <Text style={styles.countColor}>48</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white_FFFFFF,
  },
  headerColumn: {
    flexDirection: 'column',
    backgroundColor: color.white_FFFFFF,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20, // Dynamic padding for Android
  },
  profileId: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    backgroundColor: color.brown_F7E4B6,
  },
  countryName: {
    color: color.brown_3C200A,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  cityName: {
    color: color.brown_3C200A,
    fontSize: 14,
    lineHeight: 22,
  },
  date: {
    color: color.brown_3C200A,
    fontSize: 14,
    lineHeight: 22,
  },
  time: {
    color: color.brown_3C200A,
    fontSize: 14,
    height: 22,
    lineHeight: 22,
  },
  userId: {
    color: color.brown_3C200A,
    fontSize: 14,
    height: 22,
    marginLeft: 10,
    lineHeight: 22,
  },
  drawerIcon: {
    width: 20,
    height: 22,
  },
  userIcon: {
    width: 28,
    height: 28,
  },
  scan: {
    left: 5,
  },
  count: {
    marginLeft: Platform.OS === 'ios' ? 30 : 15,
    backgroundColor: color.black_2F251D,
    borderRadius: 4,
    width: 49,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countColor: {
    color: color.white_FFFFFF,
  },
});

export default Header;
