import React, {
  PropsWithChildren,
  ReactChild,
  ReactChildren,
  ReactElement,
} from 'react';
import { Text } from 'react-native-paper';

/**
 * Helper component that will take a text with placeholders marked by {{...}} and replace every match of this pattern with the children provided
 * @param placeholder String containing the original text, with placeholders marked by {{...}}
 * @param children Component children nodes, will be used to replace each instance of replaceable placeholders from original text
 * @param style StyleSheet style used to stylize the text container that will wrap the final result
 * @param replacePlaceholder Bool that controlls wether the text provided as placeholder is replaced or not. If this parameter is truthy, result will use text provided in child component, else it will insert the key of placeholder in the child component
 * @returns React native paper text component, containing the original text, with placeholders replaced by the children provided
 */
const TextReplacer = ({
  placeholder,
  children,
  style,
  replacePlaceholder,
}: {
  placeholder: string;
  children: React.ReactNode; // ## replace with proper type
  style: any; // ## replace with proper type
  replacePlaceholder?: boolean;
}) => {
  const replacement = placeholder.split(/{{.*?}}/g);
  // const matches = [...placeholder.matchAll(/(?<={{).*?(?=}})/g)]; // Positive look ahead not supported :(
  const matches = [...placeholder.matchAll(/{{.*?}}/g)];

  React.Children.toArray(children).forEach((child: any, index: number) => {
    // let match = matches[index]
    replacement.splice(index * 2 + 1, 0, {
      ...child,
      props: {
        ...child.props,
        children: replacePlaceholder
          ? child.props.children
          : matches[index][0].replace('{{', '').replace('}}', ''),
      },
    });
  });

  return <Text style={style}>{replacement}</Text>;
};

export default TextReplacer;
