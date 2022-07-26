import {
  Text,
  Box,
  FlatList,
  VStack,
  HStack,
  Image,
  Spacer,
  Heading,
  Button,
} from "native-base";
import { useCallback, useEffect } from "react";
import { auth } from "../helpers/firebase";
import { functions } from "../helpers/firebase";
import {
  useAuthUser,
  useAuthSignInAnonymously,
  useAuthLinkWithCredential,
} from "@react-query-firebase/auth";
import { useFunctionsQuery } from "@react-query-firebase/functions";
import { EmailAuthProvider } from "firebase/auth";

type RequestData = {};
type ResponseData = {
  [key: string]: {
    id: string;
    label: string;
    date: string;
    value: number;
    method: string;
    exp: number;
    createdAt: string;
    icon: string;
  }[];
};

export function HomeScreen() {
  const authQuery = useAuthUser(["user"], auth);
  const { mutate: linkWithCredential } = useAuthLinkWithCredential({
    onSuccess(data, variables, context) {
      console.log("[linkWithCredential, onSuccess]");
      authQuery.refetch();
    },
  });
  const mutation = useAuthSignInAnonymously(auth, {
    onSuccess(data, variables, context) {
      console.log("[onSuccess]: ", data);
    },
    onError(error, variables, context) {
      console.warn("[onError]: ", error);
    },
  });
  const functionsQuery = useFunctionsQuery<RequestData, ResponseData>(
    ["getActivities"],
    functions,
    "getActivities",
    {}
  );

  useEffect(() => {
    console.log("[authQuery.data]: ", authQuery.data);
  }, [authQuery]);

  const handleSigninAnonymously = useCallback(() => {
    if (authQuery.isLoading || authQuery.isFetching || authQuery.data) {
      return () => {};
    }
    mutation.mutate({
      email: "",
      password: "",
    });
  }, [authQuery]);

  const handleSigninWithEmailAndPassword = useCallback(() => {
    if (!authQuery.data) {
      return;
    }
    const email = "example@example.com";
    const password = "password";
    const credential = EmailAuthProvider.credential(email, password);
    linkWithCredential({
      user: authQuery.data,
      credential,
    });
  }, [authQuery]);

  return (
    <Box flex={1} safeArea>
      <Box px={3} py={3}>
        {!authQuery.data && authQuery.isFetched ? (
          <Button
            onPress={handleSigninAnonymously}
            isLoading={authQuery.isFetching || authQuery.isLoading}
          >
            {"匿名認証を行う"}
          </Button>
        ) : null}
        {authQuery.data && authQuery.data.isAnonymous ? (
          <Button
            bg={authQuery.data?.isAnonymous ? "cyan.500" : "dark.500"}
            onPress={handleSigninWithEmailAndPassword}
            isLoading={authQuery.isFetching || authQuery.isLoading}
            disabled={!authQuery.data?.isAnonymous}
          >
            {"匿名アカウントから変更する"}
          </Button>
        ) : null}
        {authQuery.data && !authQuery.data.isAnonymous ? (
          <Text>{authQuery.data.email}</Text>
        ) : null}
      </Box>
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
        data={functionsQuery.data?.["2022-07-15"] ?? []}
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
