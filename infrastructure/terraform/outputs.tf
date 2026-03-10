output "node1_tunnel_token" {
  description = "Token untuk Node 1 - Masukkan ke cloudflared di SSD Node"
  value       = cloudflare_zero_trust_tunnel_cloudflared.node1_tunnel.tunnel_token
  sensitive   = true
}

output "node2_tunnel_token" {
  description = "Token untuk Node 2 - Masukkan ke cloudflared di HDD Node"
  value       = cloudflare_zero_trust_tunnel_cloudflared.node2_tunnel.tunnel_token
  sensitive   = true
}

output "azure_tunnel_token" {
  description = "Token untuk Azure Witness"
  value       = cloudflare_zero_trust_tunnel_cloudflared.azure_tunnel.tunnel_token
  sensitive   = true
}