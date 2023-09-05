"use client";
import {
  Authenticator,
  Card,
  View,
  Heading,
  Flex,
  Badge,
  Text,
  Button,
  useTheme,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import roadImage from "@/assets/img/road-to-milford-new-zealand-1400w.jpg";
import Image from "next/image";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { useEffect, useState } from "react";
import { listEmployees } from "@/graphql/queries";
import { EmployeeDataType } from "@/types/graphql-types";

type Props = {};
export default function About({}: Props) {
  const { tokens } = useTheme();
  const [imageSrc, setImageSrc] = useState<string[]>([]);
  const [employees, setEmployees] = useState<EmployeeDataType[]>([]);

  // async function getEmployees() {
  //   try {
  //     // get data from dynamodb via appsync api
  //     const {
  //       data: {
  //         listEmployees: { items },
  //       },
  //     } = (await API.graphql(graphqlOperation(listEmployees))) as {
  //       data: { listEmployees: { items: EmployeeDataType[] } };
  //     };
  //     console.log(items);

  //     setEmployees(items);

  //     //loop through items and get image for each item from S3
  //     employees.map(async (item, index) => {
  //       const imagePath = items[index].imgPath;
  //       try {
  //         const s3ImageURI = await Storage.get(imagePath, { expires: 120 });
  //         console.log("s3ImageURI: ", s3ImageURI);
  //         setImageSrc([...imageSrc, s3ImageURI]);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function getImage(items: EmployeeDataType[]) {
    //loop through items and get image for each item from S3
    items.forEach(async (item, index) => {
      const imagePath = items[index].imgPath;
      try {
        const s3ImageURI = await Storage.get(imagePath, { expires: 120 });

        setImageSrc([...imageSrc, s3ImageURI]);
      } catch (error) {
        console.log(error);
      }
    });
    console.log(imageSrc);
  }

  useEffect(() => {
    async function getEmployees() {
      try {
        // get data from dynamodb via appsync api
        const {
          data: {
            listEmployees: { items },
          },
        } = (await API.graphql(graphqlOperation(listEmployees))) as {
          data: { listEmployees: { items: EmployeeDataType[] } };
        };
        console.log(items);

        //loop through items and get image for each item from S3
        const imagePromises = items.map(async (item) => {
          try {
            const s3ImageURI = await Storage.get(item.imgPath, {
              expires: 120,
            });
            return s3ImageURI;
          } catch (error) {
            console.log(error);
            return null; // Handle errors gracefully
          }
        });

        // Wait for all image fetch promises to resolve
        const imageUrls = await Promise.all(imagePromises);

        // Update state variables
        setEmployees(items);
        setImageSrc(imageUrls.filter((url) => url !== null) as string[]); // Filter out null values
      } catch (error) {
        console.log(error);
      }
    }
    getEmployees();
  }, []);

  return (
    <Authenticator signUpAttributes={["name"]}>
      {({ signOut, user }) => (
        <main>
          <button onClick={signOut}>Sign out</button>
          <Flex justifyContent={"center"} alignContent={"center"}>
            <Card variation="elevated">
              <Heading level={3}>Hello {user!.attributes?.name}</Heading>
            </Card>
          </Flex>
          {employees &&
            employees.map((employee, index) => (
              <View
                key={employee.id}
                backgroundColor={tokens.colors.background.secondary}
                padding={tokens.space.medium}
              >
                <Card>
                  <Flex
                    direction={["column", "row"]} // Switches to column on small screens
                    alignItems={["center", "flex-start"]} // Adjust alignment based on screen size
                  >
                    <Image
                      alt="Road to milford sound"
                      //src={"/img/road-to-milford-new-zealand-1400w.jpg"}
                      src={`${imageSrc[index]}`}
                      //src={roadImage}
                      width={300}
                      height={300}
                    />
                    <Flex
                      direction="column"
                      alignItems="flex-start"
                      gap={tokens.space.xs}
                    >
                      <Flex>
                        <Badge size="small" variation="info">
                          Plus
                        </Badge>
                        <Badge size="small" variation="success">
                          Verified
                        </Badge>
                      </Flex>

                      <Heading level={5}>{employee.name}</Heading>

                      <Text as="span">
                        {employee.email} - {imageSrc[index] ?? "undefined"}
                      </Text>
                      <Button variation="primary">Book it</Button>
                    </Flex>
                  </Flex>
                </Card>
              </View>
            ))}
        </main>
      )}
    </Authenticator>
  );
}
