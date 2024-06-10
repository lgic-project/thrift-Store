import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Text, View } from "react-native";

interface TabIconProps {
  icon: any;
  activeIcon: any;
  color: string;
  name: string;
  focused: boolean;
  iconSize?: number;
}

const TabIcon = ({ icon, activeIcon, color, name, focused }: TabIconProps) => {
  return (
    <View className="items-center justify-center gap-2">
      <TabBarIcon
        name={focused ? (activeIcon as any) : (icon as any)}
        color={color}
      />
      <Text
        className={`text-xs ${
          focused ? "font-psemibold" : "font-pregular"
        } text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 84,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={"home-outline"}
              activeIcon={"home"}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={"compass-outline"}
              activeIcon={"compass-sharp"}
              color={color}
              name="Discover"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={"add-circle-outline"}
              activeIcon={"add-circle-sharp"}
              color={color}
              name="Create"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notification",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={"notifications-outline"}
              activeIcon={"notifications"}
              color={color}
              name="Notification"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={"person-outline"}
              activeIcon={"person"}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
