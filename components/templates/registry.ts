import type { InvitationTemplate } from "./types";

import { template001 } from "./template-001/index";
import { template002 } from "./template-002/index";
import { template003 } from "./template-003/index";
import { template004 } from "./template-004/index";
import { template005 } from "./template-005/index";
import { template006 } from "./template-006/index";
import { template007 } from "./template-007/index";
import { template008 } from "./template-008/index";
import { template009 } from "./template-009/index";
import { template010 } from "./template-010/index";
import { template011 } from "./template-011/index";

export const templateRegistry: Partial<
  Record<string, InvitationTemplate>
> = {
  [template001.id]: template001,
  [template002.id]: template002,
  [template003.id]: template003,
  [template004.id]: template004,
  [template005.id]: template005,
  [template006.id]: template006,
  [template007.id]: template007,
  [template008.id]: template008,
  [template009.id]: template009,
  [template010.id]: template010,
  [template011.id]: template011,
};
