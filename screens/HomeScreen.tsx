import { useQuery } from "@tanstack/react-query";
import {
  Text,
  Box,
  FlatList,
  VStack,
  HStack,
  Image,
  Spacer,
  Heading,
} from "native-base";

const loader = () => {
  return {
    "2022-07-15": [
      {
        id: "activity-id-1",
        label: "腹筋ローラー",
        date: "2022/7/15",
        value: "20",
        method: "COUNT",
        exp: 100,
        createdAt: "14:25",
        icon: "https://wallpaperaccess.com/full/317501.jpg",
      },
      {
        id: "activity-id-2",
        label: "腹筋ローラー",
        date: "2022/7/15",
        value: "20",
        method: "COUNT",
        exp: 100,
        createdAt: "14:28",
        icon: "https://wallpaperaccess.com/full/317501.jpg",
      },
      {
        id: "activity-id-3",
        label: "腹筋ローラー",
        date: "2022/7/15",
        value: "01:00",
        method: "TIME",
        exp: 200,
        createdAt: "14:31",
        icon: "https://wallpaperaccess.com/full/317501.jpg",
      },
    ],
  };
};

export function HomeScreen() {
  const query = useQuery(["todos"], loader);

  return (
    <Box flex={1} safeArea>
      <Box px={3} py={3}>
        <Heading>最近のアクティビティ</Heading>
      </Box>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}
        h="1/2"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        backgroundColor={"dark.800"}
        data={query.data?.["2022-07-15"] ?? []}
        renderItem={({ item }) => {
          const { icon, date, label, value, createdAt, method, exp } = item;
          return (
            <>
              <VStack w="full" borderRadius={10} bg={"white"} px={3} py={3}>
                <HStack mb={3}>
                  <Image
                    source={{
                      uri: icon,
                    }}
                    alt="Alternate Text"
                    size="sm"
                    borderRadius={10}
                  />
                  <VStack px={3}>
                    <Text fontWeight={date === "今日" ? "bold" : "normal"}>
                      {date}
                    </Text>
                    <Text color="dark.400">{label}</Text>
                  </VStack>
                </HStack>
                <HStack>
                  <VStack>
                    <Text fontWeight={"bold"} fontSize={"lg"}>
                      {value}
                    </Text>
                    <Text color="dark.500">
                      {method === "COUNT" ? "回" : "時間"}
                    </Text>
                  </VStack>
                  <Spacer />
                  <VStack>
                    <Text fontWeight={"bold"} fontSize={"lg"}>
                      {exp}
                    </Text>
                    <Text color="dark.500">経験値</Text>
                  </VStack>
                  <Spacer />
                  <VStack>
                    <Text fontWeight={"bold"} fontSize={"lg"}>
                      {createdAt}
                    </Text>
                    <Text color="dark.500">スケジュール</Text>
                  </VStack>
                </HStack>
              </VStack>
              <Box mb={3} />
            </>
          );
        }}
      />
    </Box>
  );
}
