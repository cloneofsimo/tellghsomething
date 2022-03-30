import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Alert,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values: any) {
    const x = JSON.stringify(values);
    // send to server
    const endpoint = "http://211.58.102.6:8006/sendmsg";
    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(x);

    // get response
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status === 201) {
        const response = xhr.responseText;
        console.log(response);
        alert(response);
      } else if (this.readyState === 4 && this.status !== 201) {
        alert("서버에 연결할 수 없습니다.");
      }
    };
    return;
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            심심한 규현이에게 인편을 써주세요 🥰🥰
          </Heading>
          <Alert fontSize={"md"} textAlign={"center"} color={"red.500"}>
            규현이가 손편지로 답장을 보내려면, 여러분의 주소, 우편번호,
            전화번호를 편지에 첨부하셔야해요! (참고로 메세지들은 전부 제가 조회
            가능합니다! 민감한 정보는 빼주세요 ㅎㅎ)
          </Alert>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <HStack>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>보내는 이 </FormLabel>
                    <Input
                      id="sender"
                      type="text"
                      {...register("sender", { required: true, maxLength: 50 })}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>우편번호와 주소</FormLabel>
                    <Input
                      id="address"
                      type="text"
                      {...register("address", {
                        required: true,
                        maxLength: 100,
                      })}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl isRequired>
                <FormLabel>제목</FormLabel>
                <Input
                  id="title"
                  type="text"
                  {...register("title", { required: true, maxLength: 50 })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel> 편지 내용</FormLabel>
                <Textarea
                  id="msg"
                  {...register("msg", { required: true, maxLength: 1500 })}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true, maxLength: 50 })}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  편지보내기!
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
