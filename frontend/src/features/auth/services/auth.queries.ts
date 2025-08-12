import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AuthService,
  type LoginPayload,
  type SignupPayload,
} from "./auth.service";

const AUTH_QUERY_KEY = ["auth", "me"] as const;

export function useCurrentUserQuery() {
  return useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => {
      const res = await AuthService.profile();
      return res.success ? res.data?.user ?? null : null;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useLoginMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: LoginPayload) => AuthService.login(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
    },
  });
}

export function useSignupMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: SignupPayload) => AuthService.signup(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
    },
  });
}

export function useLogoutMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      await qc.setQueryData(AUTH_QUERY_KEY, null);
    },
  });
}
