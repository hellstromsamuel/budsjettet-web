import * as React from "react";

import { useIsMobile } from "@/hooks/useIsMobile";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

/**
 * Responsive dialog: renders a centered Dialog on desktop and a bottom Drawer
 * on mobile. The sub-components mirror the Dialog/Drawer APIs and pick the
 * correct variant from context.
 */

const DialogDrawerContext = React.createContext(false);
const useIsMobileContext = () => React.useContext(DialogDrawerContext);

function DialogDrawer(props: React.ComponentProps<typeof Dialog>) {
  const isMobile = useIsMobile();
  const Root = isMobile ? Drawer : Dialog;

  return (
    <DialogDrawerContext.Provider value={isMobile}>
      <Root {...props} />
    </DialogDrawerContext.Provider>
  );
}

function DialogDrawerTrigger(
  props: React.ComponentProps<typeof DialogTrigger>,
) {
  const isMobile = useIsMobileContext();
  const Trigger = isMobile ? DrawerTrigger : DialogTrigger;
  return <Trigger {...props} />;
}

function DialogDrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogContent>) {
  const isMobile = useIsMobileContext();
  const Content = isMobile ? DrawerContent : DialogContent;
  return (
    <Content className={className} {...props}>
      {children}
    </Content>
  );
}

function DialogDrawerHeader(props: React.ComponentProps<"div">) {
  const isMobile = useIsMobileContext();
  const Header = isMobile ? DrawerHeader : DialogHeader;
  return <Header {...props} />;
}

function DialogDrawerFooter(props: React.ComponentProps<"div">) {
  const isMobile = useIsMobileContext();
  const Footer = isMobile ? DrawerFooter : DialogFooter;
  return <Footer {...props} />;
}

function DialogDrawerTitle(props: React.ComponentProps<typeof DialogTitle>) {
  const isMobile = useIsMobileContext();
  const Title = isMobile ? DrawerTitle : DialogTitle;
  return <Title {...props} />;
}

function DialogDrawerDescription(
  props: React.ComponentProps<typeof DialogDescription>,
) {
  const isMobile = useIsMobileContext();
  const Description = isMobile ? DrawerDescription : DialogDescription;
  return <Description {...props} />;
}

function DialogDrawerClose(props: React.ComponentProps<typeof DialogClose>) {
  const isMobile = useIsMobileContext();
  const Close = isMobile ? DrawerClose : DialogClose;
  return <Close {...props} />;
}

export {
  DialogDrawer,
  DialogDrawerTrigger,
  DialogDrawerContent,
  DialogDrawerHeader,
  DialogDrawerFooter,
  DialogDrawerTitle,
  DialogDrawerDescription,
  DialogDrawerClose,
};
