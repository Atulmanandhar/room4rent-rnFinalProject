import React, { FC, ReactNode } from "react";
import { SafeAreaView, Edge } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
};
const safeAreaSupportedEdges: Edge[] = ["top", "left", "right"];

const SafeAreaWrapper: FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={safeAreaSupportedEdges}>
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;
