import React, {useState, useEffect, useRef} from 'react';
import {View, Pressable, Image, Text, StyleSheet} from 'react-native';
import {Chip, Selectize} from 'react-native-material-selectize';
import firestore from '@react-native-firebase/firestore';

const UserField = props => {
  const [users, setUsers] = useState([]);
  const userFieldRef = useRef();

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot?.forEach(documentSnapshot => {
          const user = documentSnapshot.data();
          data.push(user);
        });
        setUsers(data);
      });
    return () => subscriber();
  }, []);

  const getSelectedUsers = () => {
    return userFieldRef.current.getSelectedItems().result;
  };

  const renderAvatar = user => {
    if (user.image) {
      return <Image style={styles.avatar} source={{uri: user.image}} />;
    }
    return <Text style={styles.listInitials}>{user.userName[0]}</Text>;
  };

  return (
    <View>
      <Selectize
        ref={userFieldRef}
        chipStyle={styles.chip}
        chipIconStyle={styles.chipIcon}
        itemId="userName"
        items={users}
        label="Users"
        listStyle={styles.list}
        tintColor="#028fb0"
        textInputProps={{
          placeholder: 'Insert one or more emails',
          keyboardType: 'email-address',
        }}
        renderRow={(id, onPress, user) => (
          <Pressable key={id} onPress={onPress} style={styles.listRow}>
            <View style={styles.listWrapper}>
              <View style={styles.listIcon}>{renderAvatar(user)}</View>
              <View>
                <Text style={styles.listNameText}>{user.userName}</Text>
                <Text style={styles.listEmailText}>{user.email}</Text>
              </View>
            </View>
          </Pressable>
        )}
        renderChip={(id, onClose, item, style, iconStyle) => (
          <Chip
            key={id}
            iconStyle={iconStyle}
            onClose={onClose}
            text={id}
            style={style}
          />
        )}
      />
      <Text style={styles.coveredContent}> </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingRight: 2,
  },
  chipIcon: {
    height: 24,
    width: 24,
  },
  list: {
    backgroundColor: '#fff',
    position: 'absolute',
  },
  listRow: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  listWrapper: {
    flexDirection: 'row',
  },
  listIcon: {
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    height: 40,
    width: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  listInitials: {
    fontSize: 20,
    lineHeight: 24,
    color: '#fff',
  },
  listNameText: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 14,
    lineHeight: 21,
  },
  listEmailText: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 14,
    lineHeight: 21,
  },
  coveredContent: {
    zIndex: -1,
  },
  avatar: {
    height: 40,
    width: 40,
  },
});

export default UserField;
